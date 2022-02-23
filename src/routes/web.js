const express = require("express");
const { postWebHook, getWebHook } = require("../controllers/chatBotController");
const router = express.Router();
const homepageController = require("../controllers/homepageController");
const sequelize = require("../config/database");
const {
  getSummary,
  getMesssage,
  getMessagesByUserId,
} = require("../controllers/messageController");

sequelize.sync();
sequelize
  .authenticate()
  .then(() => {
    console.info("INFO - Database connected.");
  })
  .catch(() => {
    console.info("Error in conncting with database");
  });

let initWebRoutes = (app) => {
  router.get("/", homepageController.getHomePage);
  router.get("/webHook", getWebHook);
  router.get("/messages", getMessagesByUserId);
  router.get("/messages/:id", getMesssage);
  router.get("/summary", getSummary);
  router.post("/webHook", postWebHook);
  return app.use("/", router);
};

module.exports = {
  initWebRoutes,
};
