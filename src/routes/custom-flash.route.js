const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const { errorMessage = "", inputData = "" } = res.locals.sessionFlashMessages || {};
  res.render("home", { layout: "index", errorMessage, inputData });
});

router.get("/success", (req, res) => {
  const { inputData = "" } = res.locals.sessionFlashMessages || {};
  res.render("success", { layout: "index", inputData });
});

router.post("/entry", (req, res) => {
  const inputData = req.body.input;

  if (inputData && inputData.length > 0 && inputData.length <= 10) {
    req.session.sessionFlashMessages = { inputData };
    return res.redirect("/success");
  }
  
  req.session.sessionFlashMessages = {
    inputData,
    errorMessage: "invalid data, input must be at least 10 characters long",
  };
  return res.redirect("/");
});

module.exports = router;
