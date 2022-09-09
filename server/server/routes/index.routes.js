const router = require("express").Router();
const { renderIndexView } = require("../controllers/home.controllers");

router.get("/", renderIndexView);

module.exports = router;
