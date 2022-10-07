const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../constant/key");
const { RepositoryUser } = require("../service");

async function auth(req, res, next) {
  try {
    if (req.headers.authorization === undefined) {
      throw new Error("login first");
      return;
    }
    const token = req.headers.authorization.substring(7);

    const { email } = jwt.verify(token, PRIVATE_KEY);
    const user = await RepositoryUser.GetOnebyEmail(email);
    if (user == null) {
      throw new Error("Error Token");
    }
    req.user = { email: user.email, id: user.id };
    next();
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

async function authGraphql(tokenGraphql) {
  try {
    if (tokenGraphql === undefined) {
      throw new Error("login first");
    }
    const token = tokenGraphql.substring(7);

    const { email } = jwt.verify(token, PRIVATE_KEY);
    const user = await RepositoryUser.GetOnebyEmail(email);
    if (user == null) {
      throw new Error("Error Token");
    }
    return { email: user.email, id: user.id };
  } catch (error) {
    throw { error: error.message };
  }
}

module.exports = { auth, authGraphql };
