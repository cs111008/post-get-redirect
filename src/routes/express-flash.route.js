const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const errorMessage = req.flash("error")[0];
  const inputData = req.flash("inputData")[0];
  res.render("home", { layout: "index", errorMessage, inputData });
});

router.get("/success", (req, res) => {
  const inputData = req.flash("inputData")[0];
  res.render("success", { layout: "index", inputData });
});

router.post("/entry", (req, res) => {
  const inputData = req.body.input;

  if (inputData && inputData.length > 0 && inputData.length <= 10) {
    req.flash("inputData", inputData);
    return res.redirect("/success");
  }

  req.flash("error", "invalid data, input must be at least 10 characters long");
  req.flash("inputData", inputData);
  return res.redirect("/");
});

module.exports = router;
