const express = require("express");
const {
  getCowsInfos,
  addCow,
  updateCow,
  deleteCow,
} = require("../controllers/cowsControllers");

const router = express.Router();

// get cows informations
router.get("/", getCowsInfos);

// add a cow
router.post("/", addCow);

// update a cow
router.patch("/:id", updateCow);

// delete a cow
router.delete("/:id", deleteCow);

module.exports = router;
