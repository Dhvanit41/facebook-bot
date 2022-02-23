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
  if (daysLeft && age < 200 && age>=0) {
    return `In ${daysLeft} day(s), you will be ${age + 1}!`;  
  } else {
    return "Please enter a valid birtday.";
  }
}

function isInPositiveWords(text='') {
  let positiveWords = [
    "yes",
    "yo",
    "yeah",
    "yep",
    "sure",
    "affirmative",
    "amen",
    "fine",
    "good",
    "okay",
    "true",
    "yea",
    "all right",
    "aye",
    "beyond a doubt",
    "by all means",
    "certainly",
    "definitely",
    "even so",
    "exactly",
    "gladly",
    "good enough",
    "granted",
    "indubitably",
    "just so",
    "most assuredly",
    "naturally",
    "of course",
    "positively",
    "precisely",
    "sure thing",
    "surely",
    "undoubtedly",
    "unquestionably",
    "very well",
    "willingly",
    "without fail",
    "yep",
  ];
  return positiveWords.includes(text.toLowerCase());
}

function isInNegeativeWords(text='') {
  let negeativeWords = ["nay", "nix", "never", "not","no","not","nah"];
  return negeativeWords.includes(text.toLowerCase());
}

function askForNextBirthDayResponse(response) {
  response.text =
    "Do You want to know how many days left till your next birthday?";
  response.quick_replies = [
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
  ];
}

function askToAddBirthDayResponse(response) {
  response.text = "Please enter your birthdate.(Format:YYYY-MM-DD)";
  return response;
}

function defaultGreetingResponse(response) {
  response.text = "You can start again with just saying Hi.";
}
function goodByeResponse(response) {
  response.text = "Good Bye!";
  return response;
}
function firstTrait(nlp, name) {
  return nlp && nlp.entities && nlp.traits[name] && nlp.traits[name][0];
}

module.exports={
  callSendAPI,
  isGoodDate,
  calculateDays,
  isInPositiveWords,
  isInNegeativeWords,
  askForNextBirthDayResponse,
  askToAddBirthDayResponse,
  defaultGreetingResponse,
  goodByeResponse,
  firstTrait
}