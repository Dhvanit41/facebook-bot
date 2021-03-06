require("dotenv").config();
const {
  callSendAPI,
  isGoodDate,
  calculateDays,
  isInPositiveWords,
  isInNegeativeWords,
  firstTrait,
} = require("./utils");
const {
  postMessage,
  getUsersBirthDate,
} = require("../controllers/messageController");

async function postWebHook(req, res) {
  let body = req.body;
  if (body.object === "page") {
    for (const entry of body.entry) {
      let webhook_event = entry.messaging[0];
      let sender_psid = webhook_event.sender.id;
      if (webhook_event.message && !webhook_event.message.is_echo) {
        await handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        await handlePostback(sender_psid, webhook_event.postback);
      }
    }
    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
}

function getWebHook(req, res) {
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
}

async function handleMessage(sender_psid, message) {
  let birthDate = "";
  let is_birthdate = false;
  let response = {
    text: "You can start again with just saying Hi.",
  };
  const greeting = firstTrait(message.nlp, "wit$greetings");
  if (greeting && greeting.confidence > 0.8) {
    response.text = "Please enter your birthdate.(Format:YYYY-MM-DD)";
  } else if (isGoodDate(message.text)) {
    is_birthdate = true;
    birthDate = message.text;
    (response.text =
      "Do You want to know how many days left till your next birthday?"),
      (response.quick_replies = [
        {
          content_type: "text",
          title: "Yes",
          payload: "quick_yes",
        },
        {
          content_type: "text",
          title: "No",
          payload: "quick_no",
        },
      ]);
  } else if (
    isInPositiveWords(message.text) ||
    isInNegeativeWords(message.text) ||
    (message.quick_reply &&
      (message.quick_reply.payload == "quick_yes" ||
        message.quick_reply.payload == "quick_no"))
  ) {
    if (
      isInPositiveWords(message.text) ||
      message.quick_reply.payload == "quick_yes"
    ) {
      let databaseBirthdate = await getUsersBirthDate(sender_psid);
      response.text = `${calculateDays(databaseBirthdate)}`;
      await callSendAPI(sender_psid, response);
    }
    response.text = "Good Bye!";
    await callSendAPI(sender_psid, response);
    response = {
      text: "You can start again with just saying Hi.",
    };
  }
  await postMessage(
    sender_psid,
    message.mid,
    message.text,
    is_birthdate,
    birthDate
  );
  await callSendAPI(sender_psid, response);
}

async function handlePostback(sender_psid, received_postback) {
  let response;
  let payload = received_postback.payload;
  if (payload === "yes") {
    response = { text: "Thanks!" };
  } else if (payload === "no") response = { text: "Good Bye!" };

  await callSendAPI(sender_psid, response);
}

module.exports = {
  postWebHook,
  getWebHook,
};
