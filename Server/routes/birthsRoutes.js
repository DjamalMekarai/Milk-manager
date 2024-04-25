const express = require("express");
const {
  getBirthsInfos,
  addBirth,
  updateBirth,
  deleteBirth,
} = require("../controllers/birthsControllers");

const router = express.Router();

// get births informations
router.get("/", getBirthsInfos);

// add a birth
router.post("/", addBirth);

// update a birth
router.patch("/:id", updateBirth);

// delete a birth
router.delete("/:id", deleteBirth);

module.exports = router;
