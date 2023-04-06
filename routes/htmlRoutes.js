const htmlRoutes = require("express").Router();
const path = require("path");

// HTML GET Requests

htmlRoutes.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

htmlRoutes.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
  });

module.exports = htmlRoutes;