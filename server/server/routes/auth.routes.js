const router = require("express").Router();
const {
  renderSignUpView,
  renderLoginView,
  verifycation,
} = require("../controllers/auth.controllers");

const express = require("express");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.post("/signup", renderSignUpView);

router.post("/login", renderLoginView);

router.get("/verify", isAuthenticated, verifycation);

module.exports = router;
