const router = require("express").Router();
const Playlist = require("../models/playlist");
const Song = require("../models/song");

router.get("/songs", async (req, res) => {
  try {
    const songs = await Song.find({});
    res.json({ code: 1, data: songs });
  } catch (err) {
    res.json({ code: 0, message: "something went wrong" });
  }
});

router
  .route("/playlists")
  .get(async (req, res) => {
    try {
      const playlists = await Playlist.find({ isAdmin: true });
      res.json({ code: 1, data: playlists });
    } catch (err) {
      res.json({ code: 0, message: "something went wrong" });
    }
  })
  .post(async (req, res) => {
    try {
      const playList = new Playlist({
        name: req.body.name,
        songs: [],
        isAdmin: true,
      });
      await playList.save();
      res.json({ code: 1 });
    } catch (err) {
      res.json({ code: 0, message: err });
    }
  });

router.get("/playlist/:id", async (req, res) => {
  try {
    const { songs } = await Playlist.findById(req.params.id).populate("songs");
    res.json({ code: 1, data: songs });
  } catch (err) {
    res.json({ code: 0, message: err });
  }
});

router.post("/playlist/:id", async (req, res) => {
  try {
    await Playlist.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { songs: req.body.songId } }
    );
    res.json({ code: 1 });
  } catch (err) {
    res.json({ code: 0, message: err });
  }
});

module.exports = router;
