const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db.js");
require("dotenv").config();
const app = express();

connectDB();

app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());

app.use("/transactions", require("./routes/transaction.routes"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});