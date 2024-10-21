const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
app.use(cors());
app.use(bodyParser.json());
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const footballRoute = require("./routes/footballRoute");
const formula1Route = require("./routes/formula1Route");
const userRoute = require("./routes/userRoute");
const newsRoute = require("./routes/newsRoute");

app.get("/", (req, res) => {
  res.json({ status: "up" });
});

app.use("/api/users", userRoute);
app.use("/api/football", footballRoute);
app.use("/api/formula1", formula1Route);
app.use("/api/news", newsRoute);

const mongoDB = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@sportsplus.vs4cy.mongodb.net/?retryWrites=true&w=majority&appName=sportsplus`;

mongoose
  .connect(mongoDB)
  .then(() => {
    const connection = mongoose.connection;
    connection.once("open", () => {
      console.log("connected");
    });
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
