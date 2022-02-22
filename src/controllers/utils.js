const axios = require('axios').default;

async function callSendAPI(sender_psid, response) {
  try {
    let request_body = {
      recipient: {
        id: sender_psid,
      },
      message: response,
    };
    let req = {
      url: "https://graph.facebook.com/v6.0/me/messages",
      params: { access_token: process.env.FACEBOOK_PAGE_TOKEN },
      method: "POST",
      data: request_body,
    }
    let res = await axios(req);
    return res;
  } catch (e) {
    //console.log("error",e)
  }
}
function isGoodDate(dt){
  let reGoodDate = /^((19|20)?[0-9]{2})[- /.](0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])*$/;
    return reGoodDate.test(dt);
}

module.exports={
  callSendAPI,
  isGoodDate
}