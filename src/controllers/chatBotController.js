require("dotenv").config();
const {callSendAPI} = require('./utils')
async function postWebHook(req,res) {
  let body = req.body;
  if (body.object === "page") {
    body.entry.forEach(function (entry) {
      let webhook_event = entry.messaging[0];
      let sender_psid = webhook_event.sender.id;
      console.log("webhoooook",webhook_event)
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
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];
  if (mode && token) {
    if (
      (mode === "subscribe" &&
        token === process.env.META_WEBHOOK_VERIFY_TOKEN) ||
      "JustChecking"
    ) {
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
};
function firstTrait(nlp, name) {
  console.log("nlp entities-----",nlp);
  return nlp && nlp.entities && nlp.traits[name] && nlp.traits[name][0];
}

async function handleMessage(sender_psid,message) {
  let response ={
    "text" :"You can start again with just saying Hi."
  }
  console.log("message--",message)
  const greeting = firstTrait(message.nlp, 'wit$greetings');
  const BirthDate = firstTrait(message.nlp, 'wit$Date/Time');
  if (greeting && greeting.confidence > 0.8) {
     response.text ="Please enter your birthdate.(Format:YYYY-MM-DD)";
  } else if(BirthDate && BirthDate.confidence>0.8) { 
      response.text ="Please enter your birthdate.(Format:YYYY-MM-DD)"; 
  }
  await callSendAPI(sender_psid, response);
}
async function _handleMessage(sender_psid, received_message) {
  let response;
  if (received_message.text) {    
    response = {
      "text": `Hi There! What is your name?`
    }
    await callSendAPI(sender_psid, response);
  }     
}

async function handlePostback(sender_psid, received_postback) {
  let response;
  let payload = received_postback.payload;
  if (payload === 'yes') {
    response = { "text": "Thanks!" }
  } else if (payload === 'no') 
    response = { "text": "Good Bye!" }

  await callSendAPI(sender_psid, response);
}

module.exports = {
  postWebHook,
  getWebHook,
};
