const Gallery = require("../models/gallery");

exports.createItem = async (req, res) => {
  try {
    if (req.body.userID.length === 24 && req.body.pic.trim() !== "") {
      const newItem = await Gallery.create(req.body);

      res.status(201).send({ message: "Item Created", item: newItem });
    } else {
      res.status(200).send({ message: `No Item To Create` });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.readItem = async (req, res) => {
  try {
    if (req.params.id.length === 24) {
      const readItem = await Gallery.find({ _id: req.params.id });

      if (readItem[0]) {
        res.status(200).send({ item: readItem });
      } else {
        res
          .status(404)
          .send({ message: `No Item Found With ID: ${req.params.id}` });
      }
    } else {
      res.status(200).send({ message: `Invalid ID format` });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.readItems = async (req, res) => {
  try {
    const readItems = await Gallery.find({});

    if (readItems[0]) {
      res.status(200).send({ items: readItems });
    } else {
      res.status(404).send({ message: `No Items Found` });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    if (req.body.id.length === 24) {
      const selectedItem = await Gallery.find({ _id: req.body.id });

      if (selectedItem[0]) {
        const updatedItem = await Gallery.updateOne(
          { _id: req.body.id },
          {
            userID: req.body.userID,
            pic: req.body.pic,
          }
        );

        if (updatedItem.modifiedCount === 1) {
          const newItem = await Gallery.find({ _id: req.body.id });

          res.status(200).send({
            message: "Item Updated",
            old: selectedItem,
            updated: newItem,
          });
        } else {
          res.status(200).send({
            message: `Item With ID: ${req.body.id} Already Up To Date`,
          });
        }
      } else {
        res
          .status(404)
          .send({ message: `No Item Found With ID: ${req.body.id}` });
      }
    } else {
      res.status(200).send({ message: `Invalid ID format` });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    if (req.params.id.length === 24) {
      const selectedItem = await Gallery.find({ _id: req.params.id });

      if (selectedItem[0]) {
        const deletedItem = await Gallery.deleteOne({ _id: req.params.id });

        if (deletedItem.deletedCount === 1) {
          res.status(200).send({ message: "Item Deleted", item: selectedItem });
        } else {
          res.status(404).send({ message: "Item Not Deleted" });
        }
      } else {
        res
          .status(404)
          .send({ message: `No Item Found With ID: ${req.params.id}` });
      }
    } else {
      res.status(200).send({ message: `Invalid ID format` });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
