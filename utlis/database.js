require('dotenv').config();
const mongoose = require("mongoose");
const cnx = process.env.CNX;

const connect = async () => {
  mongoose.connect(`${cnx}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));
  await db.once("open", () => {
    console.log("Database successfully connected");
  });
};

module.exports = connect;