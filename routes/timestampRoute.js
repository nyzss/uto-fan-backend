const router = require("express").Router();
const Timestamp = require("../models/timestampModel");

router.get("/", async (req, res) => {
  try {
    const timestamps = await Timestamp.find();

    res.json(timestamps);
  } catch (err) {
    console.error(err);
    res.status(400).json("bad request");
  }
});

router.get("/:videoId", async (req, res) => {
  try {
    const videoId = req.params.videoId;

    // fetching single video timestamp data and sorting by date created

    const singleTimestamp = await Timestamp.find({ videoId: videoId }).sort({
      _id: -1,
    });
    // const singleTimestamp = await Timestamp.find({ videoId: videoId }).sort({
    //   createdAt: -1,
    // });
    res.json(singleTimestamp);
  } catch (err) {
    console.error(err);
    res.status(400).json("bad request");
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, timestamp, videoId, username } = req.body;

    const newTimestamp = new Timestamp({
      title,
      timestamp,
      username,
      videoId,
    });

    const savedTimestamp = await newTimestamp.save();

    res.json(savedTimestamp);
  } catch (err) {
    console.error(err);
    res.status(400).json("bad request");
  }
});

module.exports = router;
