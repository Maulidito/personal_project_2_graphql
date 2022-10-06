const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD } = process.env;

let sequelize = new Sequelize({
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  dialect: "postgres",
});

const BaseModel = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  DeleteAt: {
    type: "TIMESTAMP",
    defaultValue: null,
    allowNull: true,
  },
};

const news = require("./news")(sequelize, BaseModel);
const comment = require("./comment")(sequelize, BaseModel);
const user = require("./user")(sequelize, BaseModel);

news.hasMany(comment, {
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
  foreignKey: "news_fk",
});

comment.hasOne(comment, {
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
  foreignKey: "comment_tree_fk",
});

user.hasMany(comment, {
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
  foreignKey: "comment_user_fk",
});

const Model = {
  Sequelize,
  sequelize,
  news,
  comment,
  user,
};

module.exports = Model;
