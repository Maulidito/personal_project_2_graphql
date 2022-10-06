const { DataTypes, Sequelize } = require("sequelize");
const { baseModel } = require(".");

module.exports = (sequelize, BaseModel) => {
  const News = sequelize.define(
    "news",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(""),
      },
      image: {
        type: DataTypes.STRING(""),
        allowNull: true,
      },
      ...BaseModel,
    },
    sequelize
  );

  return News;
};
