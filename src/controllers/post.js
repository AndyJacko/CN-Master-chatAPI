const Post = require("../models/post");

exports.createPost = async (req, res) => {
  try {
    if (
      req.body.userID.length === 24 &&
      req.body.postimage.trim() !== "" &&
      req.body.comment.trim() !== ""
    ) {
      const newPost = await Post.create(req.body);

      res.status(201).send({ message: "Post Created", post: newPost });
    } else {
      res.status(200).send({ message: `No Post To Create` });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.readPost = async (req, res) => {
  try {
    if (req.params.id.length === 24) {
      const readPost = await Post.find({ _id: req.params.id });

      if (readPost[0]) {
        res.status(200).send({ post: readPost });
      } else {
        res
          .status(404)
          .send({ message: `No Post Found With ID: ${req.params.id}` });
      }
    } else {
      res.status(200).send({ message: `Invalid ID format` });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.readPosts = async (req, res) => {
  try {
    const readPosts = await Post.aggregate([{ $sample: { size: 5 } }]);
    await Post.populate(readPosts, { path: "user" });

    if (readPosts[0]) {
      res.status(200).send({ posts: readPosts });
    } else {
      res.status(404).send({ message: `No Posts Found` });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    if (req.body.id.length === 24) {
      const selectedPost = await Post.find({ _id: req.body.id });

      if (selectedPost[0]) {
        const updatedPost = await Post.updateOne(
          { _id: req.body.id },
          {
            userID: req.body.userID,
            postimage: req.body.postimage,
            comment: req.body.comment,
            alt: req.body.alt,
            tags: req.body.tags,
          }
        );

        if (updatedPost.modifiedCount === 1) {
          const newPost = await Post.find({ _id: req.body.id });

          res.status(200).send({
            message: "Post Updated",
            old: selectedPost,
            updated: newPost,
          });
        } else {
          res.status(200).send({
            message: `Post With ID: ${req.body.id} Already Up To Date`,
          });
        }
      } else {
        res
          .status(404)
          .send({ message: `No Post Found With ID: ${req.body.id}` });
      }
    } else {
      res.status(200).send({ message: `Invalid ID format` });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    if (req.params.id.length === 24) {
      const selectedPost = await Post.find({ _id: req.params.id });

      if (selectedPost[0]) {
        const deletedPost = await Post.deleteOne({ _id: req.params.id });

        if (deletedPost.deletedCount === 1) {
          res.status(200).send({ message: "Post Deleted", post: selectedPost });
        } else {
          res.status(404).send({ message: "Post Not Deleted" });
        }
      } else {
        res
          .status(404)
          .send({ message: `No Post Found With ID: ${req.params.id}` });
      }
    } else {
      res.status(200).send({ message: `Invalid ID format` });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
