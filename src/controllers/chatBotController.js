require("dotenv").config();
let postWebHook = (req, res) => {
  l; // Parse the request body from the POST
  let body = req.body;
    console.log("post webhook called")
  // Check the webhook event is from a Page subscription
  if (body.object === "page") {
    // Iterate over each entry - there may be multiple if batched
    console.log("body entry",body.entry)
    body.entry.forEach(function (entry) {
      // Get the webhook event. entry.messaging is an array, but
      // will only ever contain one event, so we get index 0
      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log("Sender PSID: " + sender_psid);
    });
    console.log("returning")
    // Return a '200 OK' response to all events
    res.status(200).send("EVENT_RECEIVED");
  } else {
    // Return a '404 Not Found' if event is not from a page subscription
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

function handleMessage(sender_psid, received_message) {}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {}

module.exports = {
  postWebHook,
  getWebHook,
};
