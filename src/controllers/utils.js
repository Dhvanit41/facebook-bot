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


function calculateDays(birthDate) {
  let today = new Date();
  let bday = new Date(birthDate); 
  let age = today.getFullYear() - bday.getFullYear();
  
  let upcomingBday = new Date(today.getFullYear(), bday.getMonth(), bday.getDate());
  
  if(today > upcomingBday) {
    upcomingBday.setFullYear(today.getFullYear() + 1);
  }
  
  var one_day = 24 * 60 * 60 * 1000;
  
  let daysLeft = Math.ceil((upcomingBday.getTime() - today.getTime()) / (one_day));
  
  // No need to calculate people older than 199 yo. :)   
  if (daysLeft && age < 200) {
    return `In ${daysLeft} day(s), you will be ${age + 1}!`;  
  } else {
    return "Please enter a valid birtday.";
  }
}

module.exports={
  callSendAPI,
  isGoodDate,
  calculateDays
}