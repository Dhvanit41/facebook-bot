const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize(process.env.DB_URL, {
    ssl: {
      rejectUnauthorized: false,
      required: true,
    },
  });

  module.exports = sequelize