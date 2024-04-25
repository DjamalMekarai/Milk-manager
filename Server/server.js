const express = require("express");
const cowsRoutes = require("./routes/cowsRoutes");
const testsRoutes = require("./routes/testsRoutes");
const birthsRoutes = require("./routes/birthsRoutes");
const productionsRoutes = require("./routes/productionsRoutes");
require("dotenv").config();

// express app
const app = express();

// middleware
app.use(express.json());

// cows routes
app.use("/cows", cowsRoutes);

// medical tests routes
app.use("/tests", testsRoutes);

// births routes
app.use("/births", birthsRoutes);

// productions routes
app.use("/productions", productionsRoutes);

// listen for requests
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
