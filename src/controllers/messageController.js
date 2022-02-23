require("dotenv").config();
const Messages = require("../model/message");
async function getMessagesByUserId(req, res) {
  try {
    const messages = await Messages.findAll({});
    res.send({
      status: true,
      messages,
    })
  } catch {
    res.status(500).json({
      status: true,
      message: "Something went wrong",
    });
  }
}
async function getMesssage(req, res) {
  try {
    const messages = await Messages.findAll({});
    res.send({
      status: true,
      messages,
    })
  } catch {
    res.status(500).json({
      status: true,
      message: "Something went wrong",
    });
  }
}
async function getSummary(req, res) {
  try {
    const messages = await Messages.findAll({});
    res.send({
      status: true,
      messages,
    })
  } catch {
    res.status(500).json({
      status: true,
      message: "Something went wrong",
    });
  }
}
module.exports = {
  getSummary,
  getMesssage,
  getMessagesByUserId,
};
