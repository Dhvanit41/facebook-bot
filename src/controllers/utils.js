const axios = require('axios').default;

async function callSendAPI(sender_psid, response) {
  try {
    let request_body = {
      recipient: {
        id: sender_psid,
      },
      message: response,
    };
    let res = await axios({
      uri: "https://graph.facebook.com/v6.0/me/messages",
      qs: { access_token: process.env.FACEBOOK_PAGE_TOKEN },
      method: "POST",
      json: request_body,
    });
    return res;
  } catch (e) {
    throw new Error(e);
  }
}

module.exports={
  callSendAPI,
}