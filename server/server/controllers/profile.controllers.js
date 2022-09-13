const User = require("../models/User.model");
const mongoose = require("mongoose");
const Artwork = require("../models/Artwork.model");

exports.renderNewArtForm = (req, res, next) => {
  const { title, description, owner } = req.body;

  Artwork.create({ title, description, owner })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
};

exports.renderFirstArtworks = (req, res, next) => {
  console.log(req.params);
  const { userId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  User.findById(id)
    // .populate("chat")
    .then(
      ({
        _id,
        username,
        email,
        profileImage,
        artist,
        artwork,
        discipline,
        autodefinition,
        collaborators,
        link,
      }) => {
        res.status(200).json({
          _id: _id,
          username,
          email,
          profileImage,
          artist,
          artwork,
          discipline,
          autodefinition,
          collaborators,
          link,
        });
      }
    )
    .catch((err) => console.log(err));
};
