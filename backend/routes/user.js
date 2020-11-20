const User = require("../models/user");

const router = require("express").Router();

router
  .route("/playlists")
  .get(async (req, res) => {
    try {
      const { playlists } = await User.findById(req.user.id).populate(
        "playlists"
      );
      res.json({ code: 1, data: playlists });
    } catch (err) {
      console.log(err);
      res.json({ code: 0, message: "something went wrong" });
    }
  })
  .post(async (req, res) => {});

router.get("/playlist/:id", async (req, res) => {
  try {
    const { songs } = await Playlist.findById(req.params.id).populate("songs");
    res.json({ code: 1, data: songs });
  } catch (err) {
    res.json({ code: 0, message: err });
  }
});

router.post("/playlist/:playlistId/add/", async (req, res) => {
  const { songs } = req.body;
});

module.exports = router;
