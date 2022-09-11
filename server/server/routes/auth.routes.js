const router = require("express").Router();
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.post("/signup", (req, res, next) => {
  const {
    email,
    password,
    username,
    // profileImage,
    // artist,
    // artwork,
    // discipline,
    // autodefinition,
    // collaborators,
    // link,
  } = req.body;
  if (email === "" || password === "" || username === "") {
    res.status(400).json({ message: "Provide required fields" });
    return;
  }

  //       REMEMBER TO ADD THE CONDITIONS FOR EMAIL AND PASSWORD FORMAT

  User.findOne({ email }).then((foundUser) => {
    // If the user with the same email already exists, send an error response
    if (foundUser) {
      res.status(400).json({ message: "email already exists in the DataBase" });
      return;
    }

    User.findOne({ username })
      .then((foundUsername) => {
        if (foundUsername) {
          res.status(400).json({ message: "Name already taken :F" });
          return;
        }

        // If email is unique, proceed to hash the password
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        // Create the new user in the database
        // We return a pending promise, which allows us to chain another `then`
        return User.create({ email, password: hashedPassword, username }).then(
          (createdUser) => {
            // Deconstruct the newly created user object to omit the password
            // We should never expose passwords publicly
            const { email, username, _id } = createdUser;

            // Create a new object that doesn't expose the password
            const user = { email, username, _id };

            // Send a json response containing the user object
            res.status(201).json({ user: user });
          }
        );
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
      });
  });
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;

  // Check if email or password are provided as empty string
  if (email === "" || password === "") {
    res.status(400).json({ message: "Provide email and password." });
    return;
  }

  // Check the users collection if a user with the same email exists
  User.findOne({ email })
    .then((foundUser) => {
      if (!foundUser) {
        // If the user is not found, send an error response
        res.status(401).json({ message: "User not found." });
        return;
      }

      // Compare the provided password with the one saved in the database
      const passwordCorrect = bcrypt.compareSync(password, foundUser.password);

      if (passwordCorrect) {
        // Deconstruct the user object to omit the password
        const { _id, email, name } = foundUser;

        // Create an object that will be set as the token payload
        const payload = { _id, email, name };
        // {_id:"hdbsbdkbjskjbds", email: "lorena@test.com", name: "lorena"}
        // --> Convert using HS256, jwt.sign(payload)
        // eyJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20ifQ.

        // Create and sign the token
        const authToken = jwt.sign(
          payload, //
          process.env.TOKEN_SECRET,
          { algorithm: "HS256", expiresIn: "6h" }
        );

        // Send the token as the response
        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: "Unable to authenticate the user" });
      }
    })
    .catch((err) => res.status(500).json({ message: "Internal Server Error" }));
});

router.get("/verify", isAuthenticated, (req, res) => {
  console.log(`req.payload`, req.payload);
  res.status(200).json(req.payload);
});

module.exports = router;
