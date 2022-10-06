const { DataTypes, Sequelize } = require("sequelize");
const { baseModel } = require(".");

module.exports = (sequelize, BaseModel) => {
  const User = sequelize.define(
    "user",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ...BaseModel,
    },
    sequelize
  );

  return User;
};
