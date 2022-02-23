// Include Sequelize module.
const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const Messages = sequelize.define(
  "tbl_messages",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: Sequelize.STRING,
    },
    user_name: {
      type: Sequelize.STRING,
    },
    message_id: {
      type: Sequelize.STRING,
    },
    message_name: {
      type: Sequelize.STRING,
    },
  },
  {
    modelName: "Messages",
  }
);
module.exports = Messages;