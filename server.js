require("dotenv").config();
require("./src/db/conn");
const express = require("express");

const userRoutes = require("./src/routes/user");
const chatRoutes = require("./src/routes/chat");

const app = express();
const port = process.env.PORT || 8081;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

  next();
});

app.use(userRoutes);
app.use(chatRoutes);

app.listen(port, () => {
  console.log(`Server Connected On Port: ${port}...`);
});
