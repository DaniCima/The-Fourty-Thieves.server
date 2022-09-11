const { Schema, model } = require("mongoose");

const artworkSchema = new Schema({
  title: String,
  description: String,
  // chat: [{ type: Schema.Types.ObjectId, ref: "Chat" }],
  // owner will be added later on
});

module.exports = model("Artwork", artworkSchema);
