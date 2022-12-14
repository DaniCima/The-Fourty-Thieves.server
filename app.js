// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const { isAuthenticated } = require("./middleware/jwt.middleware");

// 👇 Start handling routes here
// Contrary to the views version, all routes are controlled from the routes/index.js
const allRoutes = require("./routes/index.routes");
app.use("/", allRoutes);
// // route for authentication
const auth = require("./routes/auth.routes");
app.use("/auth", auth);
// // route for profile
const profile = require("./routes/profile.routes");
app.use("/profile", isAuthenticated, profile);
// // route for general gallery
const gallery = require("./routes/gallery.routes");
app.use("/gallery", gallery);
// // route for comments
// const chat = require("./routes/gallery.routes");
// app.use("/chat", chat);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
