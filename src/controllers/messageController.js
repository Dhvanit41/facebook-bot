require("dotenv").config();
const Messages = require("../model/message");
async function getMessagesByUserId(req, res) {
  try {
    const messages = await Messages.findAll({});
    res.send({
      status: true,
      messages,
    });
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
    let users = {};
    let summary = [];
    for(let message of messages){
      if(users["user_id"] &&users["user_id"].length){
        users["user_id"].push({
          "user":message["user_id"],
          "message":message["message_name"],
          "messagId":message["message_id"],
        })
      }else{
        users["user_id"] = [{
          "user":message["user_id"],
          "message":message["message_name"],
          "messagId":message["message_id"],
        }]
      }
    }
    Object.keys(users).forEach(userId=>{
      summary.push(users[userId])
    })
      res.send({
      status: true,
      summary,
    });
  } catch(e) {
    res.status(500).json({
      status: true,
      message: "Something went wrong",
    });
  }
}
async function getMesssage(req, res) {
  try {
    const { id } = req.params;
    const message = await Messages.findOne({ where: { message_id:id} });
    res.send({
      status: true,
      message,
    });
  } catch {
    res.status(500).json({
      status: true,
      message: "Something went wrong",
    });
  }
}
async function postMessage(user_id, user_name="", message_id, message_name="",is_birthdate=false,birthdate="") {
  console.log("called post message")
  await Messages.create({
    user_id,
    user_name,
    message_id,
    message_name,
    is_birthdate,
    birthdate
  });
}
async function getUsersBirthDate(user_id){
  const message = await Messages.findOne({ where: { user_id,is_birthdate:true} });
  return message.birthdate;
}

module.exports = {
  getSummary,
  getMesssage,
  getMessagesByUserId,
  postMessage,
  getUsersBirthDate
};
