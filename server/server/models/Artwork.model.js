const { Schema, model } = require("mongoose");

const artworkSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  owner: [{ type: Schema.Types.ObjectId, ref: "User" }],
  // chat: [{ type: Schema.Types.ObjectId, ref: "Chat" }],
  // owner will be added later on
});

module.exports = model("Artwork", artworkSchema);
