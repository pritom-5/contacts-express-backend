const express = require("express");
const errorHandler = require("./customMiddleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

connectDb();
const app = express();

// get values from env file
const port = process.env.port || 5001;

// to get data from post
app.use(express.json());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/contacts", require("./routes/contactRoutes"));
app.get("/hello", (req, res) => {
  res.status(200);
  res.send("This is Home");
});
// error handleing middleware
app.use(errorHandler);

// listen
app.listen(port, () => {
  console.log(`server running at port: ${port}`);
});
