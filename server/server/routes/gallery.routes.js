const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Artwork = require("../models/Artwork.model");
// const Chat = require("../models/Chat.model");

//  POST /gallery  -  Creates a new Artwork
router.post("/gallery", (req, res, next) => {
  const { title, description } = req.body;

  Artwork.create({ title, description })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//  GET /gallery -  Retrieves all of the Artworks
router.get("/gallery", (req, res, next) => {
  Artwork.find()
    // .populate("chat")
    .then((allArtworks) => res.json(allArtworks))
    .catch((err) => res.json(err));
});

module.exports = router;
