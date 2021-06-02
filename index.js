const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://amatsuka.netlify.app/"],
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://amatsuka.netlify.app/");
  res.header("Access-Control-Allow-Header", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, GET");
    return res.status(200).json({});
  }
});

console.log("Database_URI", process.env.MONGO_DB_URI);
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
mongoose.connect(
  process.env.MONGO_DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to MongoDB");
  }
);

app.use("/timestamp", require("./routes/timestampRoute"));
