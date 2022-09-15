const { Schema, model } = require("mongoose");

const artworkSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  owner: [{ type: Schema.Types.ObjectId, ref: "User" }],
  imageUrl: { type: String },
  link: { type: String },
  // chat: [{ type: Schema.Types.ObjectId, ref: "Chat" }],
});

module.exports = model("Artwork", artworkSchema);
