const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Artwork = require("../models/Artwork.model");
// const Chat = require("../models/Chat.model");

//  GET /api/gallery/:artwork -  Retrieves a specific Artwork by id
router.get("/gallery/:artwork", (req, res, next) => {
  const { artwork } = req.params;

  if (!mongoose.Types.ObjectId.isValid(artwork)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  // Each Artwork document has `tasks` array holding `_id`s of Task documents
  // We use .populate() method to get swap the `_id`s for the actual Task documents
  Artwork.findById(artwork)
    // .populate("chat")
    .then((Artwork) => res.status(200).json(Artwork))
    .catch((error) => res.json(error));
});

// PUT  /api/gallery/:artwork  -  Updates a specific Artwork by id
router.put("/gallery/:artwork", (req, res, next) => {
  const { artwork } = req.params;

  if (!mongoose.Types.ObjectId.isValid(artwork)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Artwork.findByIdAndUpdate(artwork, req.body, { new: true })
    .then((updatedArtwork) => res.json(updatedArtwork))
    .catch((error) => res.json(error));
});

// DELETE  /api/gallery/:artwork  -  Deletes a specific Artwork by id
router.delete("/gallery/:artwork", (req, res, next) => {
  const { artwork } = req.params;

  if (!mongoose.Types.ObjectId.isValid(artwork)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Artwork.findByIdAndRemove(artwork)
    .then(() =>
      res.json({
        message: `Artwork with ${artwork} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
