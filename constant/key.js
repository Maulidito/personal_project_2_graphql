const fs = require("fs");
module.exports = {
  PRIVATE_KEY: fs.readFileSync("cert/key.pem"),
};
