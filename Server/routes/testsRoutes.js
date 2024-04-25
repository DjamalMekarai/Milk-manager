const express = require("express");
const {
  getTestsInfos,
  addTest,
  updateTest,
  deleteTest,
} = require("../controllers/testsControllers");

const router = express.Router();

// get medical tests informations
router.get("/", getTestsInfos);

// add a medical test
router.post("/", addTest);

// update a medical test
router.patch("/:id", updateTest);

// delete a medical test
router.delete("/:id", deleteTest);

module.exports = router;
