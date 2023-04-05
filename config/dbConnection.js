const mongoose = require("mongoose");

async function connectDb() {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

module.exports = connectDb;
