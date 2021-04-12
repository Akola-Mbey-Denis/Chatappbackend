var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/index", function (req, res) {
  res.json({
    name: "nnnn",
  });
});

module.exports = router;
