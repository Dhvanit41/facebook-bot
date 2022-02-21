require('dotenv').config()
let postWebHook = (req, res) => {
  let body = req.body;
  if (body.object === "page") {
    body.entry.forEach(function (entry) {
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
    });
    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
};

let getWebHook = (req, res) => {
    console.log("in get")
  let mode = req.query["hub.mode"];
  let token = req.query["hub.verify_token"];
  let challenge = req.query["hub.challenge"];
   console.log(mode,token)
    console.log(process.env.META_WEBHOOK_VERIFY_TOKEN)
  if (mode && token) {
    if (mode === "subscribe" && token === process.env.META_WEBHOOK_VERIFY_TOKEN || "JustChecking") {
        console.log("asdf")
      console.log("WEBHOOK_VERIFIED");
      res.status(200).send(challenge);
    } else {
        console.log("in else")
       res.sendStatus(403);
    }
  }
};

module.exports = {
  postWebHook,
  getWebHook,
};
