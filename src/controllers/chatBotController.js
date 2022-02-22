require("dotenv").config();
const {callSendAPI} = require('./utils')
let postWebHook = (req, res) => {
  let body = req.body;
  if (body.object === "page") {
    body.entry.forEach(function (entry) {
      let webhook_event = entry.messaging[0];
      let sender_psid = webhook_event.sender.id;
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback);
      }
    });
    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
};

let getWebHook = (req, res) => {
  console.log("in get");
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];
  console.log(mode, token);
  console.log(process.env.META_WEBHOOK_VERIFY_TOKEN);
  if (mode && token) {
    if (
      (mode === "subscribe" &&
        token === process.env.META_WEBHOOK_VERIFY_TOKEN) ||
      "JustChecking"
    ) {
      console.log("asdf", process.env.META_WEBHOOK_VERIFY_TOKEN);
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
      console.log("in else");
      res.sendStatus(403);
    }
  }
};

async function handleMessage(sender_psid, received_message) {
  let response;
  if (received_message.text) {    
    response = {
      "text": `You sent the message: "${received_message.text}". Now send me an image!`
    }
  }  
    await callSendAPI(sender_psid, response);    
}
function handlePostback(sender_psid, received_postback) {}

module.exports = {
  postWebHook,
  getWebHook,
};
