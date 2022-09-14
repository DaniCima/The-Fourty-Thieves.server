const router = require("express").Router();
const {
  renderNewArtForm,
  renderFirstArtworks,
} = require("../controllers/profile.controllers");

//  POST /profile  -  Creates a new Artwork
router.post("/profile/:username", renderNewArtForm);

//  GET /profile -  Retrieves all of the Artworks
router.get("/profile/:username", renderFirstArtworks);

// router.put("/profile/:username", (req, res) => {
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
