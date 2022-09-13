const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const { retrieveRandomArt } = require("../controllers/gallery.controllers");
const { renderNewArtForm } = require("../controllers/profile.controllers");
const { isAuthenticated } = require("../middleware/jwt.middleware");

const Artwork = require("../models/Artwork.model");
// const Chat = require("../models/Chat.model");

//  POST /gallery  -  Creates a new Artwork
router.post("/", isAuthenticated, renderNewArtForm);

//  GET /gallery -  Retrieves randomly all of the Artworks
router.get("/", retrieveRandomArt);

//  POST /gallery/:username  -  Creates a new Artwork
router.post("/:username", (req, res, next) => {
  const { username } = req.params;
  const { title, description } = req.body;

  Artwork.create({ title, description })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//  GET /gallery/:username -  Retrieves randomly all of the Artworks
router.get("/:username", async (req, res, next) => {
  // use username to find matching user in DB
  const user = await User.findOne({ username: req.params.username });
  console.log(user._id.toString());
  // get Id form that user ans pass this Id
  Artwork.find({ owner: { $all: [user._id.toString()] } })
    // .populate("chat")
    .then((allArtworks) => {
      console.log(allArtworks);
      res.json(allArtworks);
    })

    .catch((err) => res.json(err));
});

//  GET /gallery/:artworkId -  Retrieves a specific Artwork by id
router.get("/artwork/:artworkId", (req, res, next) => {
  const { artworkId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(artworkId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  // Each Artwork document has `tasks` array holding `_id`s of Task documents
  // We use .populate() method to get swap the `_id`s for the actual Task documents
  Artwork.findById(artworkId)
    // .populate("chat")
    .then((Artwork) => res.status(200).json(Artwork))
    .catch((error) => res.json(error));
});

// PUT  /gallery/:artworkId  -  Updates a specific Artwork by id
router.put("/artwork/:artworkId", (req, res, next) => {
  const { artworkId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(artworkId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Artwork.findByIdAndUpdate(artworkId, req.body, { new: true })
    .then((updatedArtwork) => res.json(updatedArtwork))
    .catch((error) => res.json(error));
});

// DELETE  /api/gallery/:artworkId  -  Deletes a specific Artwork by id
router.delete("/:artworkId", (req, res, next) => {
  const { artworkId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(artworkId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Artwork.findByIdAndRemove(artworkId)
    .then(() =>
      res.json({
        message: `Artwork with ${artworkId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
