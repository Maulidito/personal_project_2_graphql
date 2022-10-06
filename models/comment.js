const { DataTypes } = require("sequelize");

module.exports = (sequelize, BaseModel) =>
  sequelize.define("comment", {
    // Model attributes are defined here
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ...BaseModel,
  });
