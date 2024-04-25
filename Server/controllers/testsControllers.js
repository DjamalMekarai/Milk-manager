
// get medical tests informations
const fs = require('fs');

const getTestsInfos = (req, res) => {
  try {
    // Read the contents of the JSON file synchronously
    const data = fs.readFileSync("data/medicalTests.json");

    // Parse the JSON data
    const obj = JSON.parse(data);

    // Send the tests list in the response
    res.status(200).json(obj.testsList);
  } catch (err) {
    // If an error occurs, send an error response
    res.status(400).json({ message: err.message });
  }
};


// Function to add a medical test
const addTest = (req, res) => {
  try {
    const { testDate, disease } = req.body;
    readTestData((err, testData) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      const id = ++testData.lastTestIdentifier;
      const newTest = { id, testDate, disease };
      testData.testsList.unshift(newTest);
      writeTestData(testData, (err) => {
        if (err) {
          return res.status(400).json({ message: err.message });
        }
        res.status(200).json(newTest);
      });
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// update a medical test
const updateTest = (req, res) => {
  try {
    const id = Number(req.params.id);
    const { testDate, disease } = req.body;
    readTestData((err, testData) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
      const testIndex = testData.testsList.findIndex(test => test.id === id);
      if (testIndex === -1) {
        return res.status(404).json({ message: "Test not found" });
      }
      testData.testsList[testIndex].testDate = testDate;
      testData.testsList[testIndex].disease = disease;
      writeTestData(testData, (err) => {
        if (err) {
          return res.status(400).json({ message: err.message });
        }
        res.status(200).json({ id, testDate, disease });
      });
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// delete a medical test
const deleteTest = (req, res) => {
  try {
    const id = Number(req.params.id);
    fs.readFile("data/medicalTests.json", (err, data) => {
      if (err) return res.status(400).json({ message: err.message });
      let deletedTest;
      let obj = JSON.parse(data);
      obj.testsList = obj.testsList.filter((test) => {
        if (test.id == id) {
          deletedTest = { ...test };
          return false;
        }
        return true;
      });
      fs.writeFile("data/medicalTests.json", JSON.stringify(obj), (err) => {
        if (err) return res.status(400).json({ message: err.message });
        res.status(200).json(deletedTest);
      });
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getTestsInfos, addTest, updateTest, deleteTest };
