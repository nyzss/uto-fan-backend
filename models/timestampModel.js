const mongoose = require("mongoose");

const timestampSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
  videoId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Timestamp = mongoose.model("timestamp", timestampSchema);

module.exports = Timestamp;
