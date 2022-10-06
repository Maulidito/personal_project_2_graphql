var express = require("express");
const multer = require("multer");
const auth = require("../middleware/auth");

const upload = multer({ dest: "public/uploads/images/" });
var router = express.Router();

/* GET home page. */

const {
  RepositoryNews,
  RepositoryComment,
  GetAllCommentOnSpecificNews,
} = require("../service/");

async function GetAll(req, res, next) {
  try {
    const dataNews = await RepositoryNews.getAll();
    res.status(200).send({ data: dataNews });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

router.post("/", auth, upload.single("image"), async function (req, res, next) {
  try {
    const dataBodyWImage = { ...req.body, image: req.file.path.substring(6) };
    const dataNews = await RepositoryNews.Add(dataBodyWImage);
    res.status(201).send({ data: dataNews });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.patch(
  "/",
  auth,
  upload.single("image"),
  async function (req, res, next) {
    try {
      const dataBodyWImage = { ...req.body, image: req.file.path.substring(6) };
      await RepositoryNews.Update(dataBodyWImage);
      res.status(200).send({ status: "OK" });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);

router.delete("/", auth, async function (req, res, next) {
  try {
    const { id } = req.body;
    const dataNews = await RepositoryNews.Delete(id);
    res.status(200).send({ status: "OK" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/:id/comment", async function (req, res, next) {
  try {
    const { id } = req.params;
    const dataComment = await GetAllCommentOnSpecificNews(id);
    res.status(200).send({ data: dataComment });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
router.post("/:id/comment", async function (req, res, next) {
  try {
    const { id } = req.params;
    const dataComment = await RepositoryComment.Add({
      ...req.body,
      news_fk: id,
    });
    res.status(200).send({ data: dataComment });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
router.post("/:id/comment/:comment_tree_fk", async function (req, res, next) {
  try {
    const { id, comment_tree_fk } = req.params;
    const dataComment = await RepositoryComment.Add({
      ...req.body,
      news_fk: id,
      comment_tree_fk: comment_tree_fk,
    });
    res.status(200).send({ data: dataComment });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
