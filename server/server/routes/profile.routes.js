const router = require("express").Router();
const User = require("../models/User.model");
const mongoose = require("mongoose");
const { isAuthenticated } = require("../middleware/jwt.middleware");

//  POST /profile  -  Creates a new Artwork
router.post("/profile/:userId", (req, res, next) => {
  const { title, description } = req.body;

  Artwork.create({ title, description })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//  GET /profile -  Retrieves all of the Artworks
router.get("/profile/:userId", (req, res, next) => {
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
});

// router.put("/profile/:userId", (req, res) => {
//   const { userId } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(userId)) {
//     res.status(400).json({ message: "Specified id is not valid" });
//     return;
//   }

//   User.findByIdAndUpdate(userId, { imageUrl })
//     .then(
//       ({
//         username,
//         email,
//         profileImage,
//         artist,
//         artwork,
//         discipline,
//         autodefinition,
//         collaborators,
//         link,
//       }) => {
//         res.status(200).json({
//           username,
//           email,
//           profileImage,
//           artist,
//           artwork,
//           discipline,
//           autodefinition,
//           collaborators,
//           link,
//         });
//       }
//     )
//     .catch((err) => console.log(err));
// });

module.exports = router;
