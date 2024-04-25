const express = require("express");
const {
  getProductionsInfos,
  addProduction,
  updateProduction,
  deleteProduction,
} = require("../controllers/productionsControllers");

const router = express.Router();

// get milk productions informations
router.get("/", getProductionsInfos);

// add a production
router.post("/", addProduction);

// update a production
router.patch("/:id", updateProduction);

// delete a production
router.delete("/:id", deleteProduction);

module.exports = router;
