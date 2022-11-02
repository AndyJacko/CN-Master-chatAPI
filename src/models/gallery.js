const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gallerySchema = new Schema({
  userID: { type: String, required: true },
  pic: { type: String, required: true },
});

const Gallery = mongoose.model("GalleryItem", gallerySchema);

module.exports = Gallery;
