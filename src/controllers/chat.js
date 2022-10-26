const Chat = require("../models/chat");

exports.createChat = async (req, res) => {
  try {
    if (
      req.body.userID.length === 24 &&
      req.body.chat.trim() !== "" &&
      req.body.tags.trim() !== ""
    ) {
      const newChat = await Chat.create(req.body);

      res.status(201).send({ message: "Chat Created", chat: newChat });
    } else {
      res.status(200).send({ message: `No User To Create` });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.readChat = async (req, res) => {
  try {
    if (req.params.id.length === 24) {
      const readChat = await Chat.find({ _id: req.params.id });

      if (readChat[0]) {
        res.status(200).send({ chat: readChat });
      } else {
        res
          .status(404)
          .send({ message: `No Chat Found With ID: ${req.params.id}` });
      }
    } else {
      res.status(200).send({ message: `Invalid ID format` });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.readChats = async (req, res) => {
  try {
    const readChats = await Chat.find({});

    if (readChats[0]) {
      res.status(200).send({ chats: readChats });
    } else {
      res.status(404).send({ message: `No Chats Found` });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.updateChat = async (req, res) => {
  try {
    if (req.body.id.length === 24) {
      const selectedChat = await Chat.find({ _id: req.body.id });

      if (selectedChat[0]) {
        const updatedChat = await Chat.updateOne(
          { _id: req.body.id },
          {
            userID: req.body.userID,
            chat: req.body.chat,
            tags: req.body.tags,
            date: new Date(),
          }
        );

        if (updatedChat.modifiedCount === 1) {
          res.status(200).send({ message: "Chat Updated", chat: selectedChat });
        } else {
          res.status(200).send({
            message: `Chat With ID: ${req.body.id} Already Up To Date`,
          });
        }
      } else {
        res
          .status(404)
          .send({ message: `No Chat Found With ID: ${req.body.id}` });
      }
    } else {
      res.status(200).send({ message: `Invalid ID format` });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.deleteChat = async (req, res) => {
  try {
    if (req.params.id.length === 24) {
      const selectedChat = await Chat.find({ _id: req.params.id });

      if (selectedChat[0]) {
        const deletedChat = await Chat.deleteOne({ _id: req.params.id });

        if (deletedChat.deletedCount === 1) {
          res.status(200).send({ message: "Chat Deleted", chat: selectedChat });
        } else {
          res.status(404).send({ message: "Chat Not Deleted" });
        }
      } else {
        res
          .status(404)
          .send({ message: `No Chat Found With ID: ${req.params.id}` });
      }
    } else {
      res.status(200).send({ message: `Invalid ID format` });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
