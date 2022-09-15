const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required."],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address."],
    lowercase: true,
    trim: true,
    unique: true,
  },
  password: { type: String, required: [true, "Password is required."] },
  profileImage: {
    type: String,
    default:
      "https://www.designboom.com/art/lets-get-digital-in-palazzo-strozzi-05-06-2022/",
  },
  artist: { type: Boolean, required: true },
  artwork: [{ type: Schema.Types.ObjectId, ref: "Artwork" }],
  discipline: { type: String },
  autodefinition: { type: String },
  // collaborators: [{ type: Schema.Types.ObjectId, ref: "User" }],
  // link: { type: String },
});

module.exports = model("User", userSchema);
