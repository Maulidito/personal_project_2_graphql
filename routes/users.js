var express = require("express");
var router = express.Router();

/* GET users listing. */

const { RepositoryUser, RegisUser, LoginUser } = require("../service/");

router.get("/:id", async function (req, res, next) {
  try {
    const { id } = req.params;
    const dataUser = await RepositoryUser.GetOnebyId(id);
    res.status(200).send({ data: dataUser });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/regis", async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const dataUser = await RegisUser(email, password);
    res.status(200).send({ data: dataUser });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/login", async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const { token } = await LoginUser(email, password);

    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
