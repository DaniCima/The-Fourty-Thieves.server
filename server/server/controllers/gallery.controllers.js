const mongoose = require("mongoose");

const Artwork = require("../models/Artwork.model");

exports.retrieveRandomArt = (req, res, next) => {
  Artwork.find()
    // .populate("chat")
    .then((allArtworks) => res.json(allArtworks))
    .catch((err) => res.json(err));
};
