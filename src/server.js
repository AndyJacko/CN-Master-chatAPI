require("./db/conn");
const express = require("express");

const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chat");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRoutes);
app.use(chatRoutes);

app.listen(port, () => {
  console.log(`Server Connected On Port: ${port}...`);
});
