const express = require('express');
const {postWebHook,getWebHook} = require('../controllers/chatBotController')
const router = express.Router()
const {getHomePage} = require('../controllers/homepageController')
let initWebRoutes = (app)=>{
   router.get('/',getHomePage);
   router.get('/webHook',getWebHook);
   router.post('/webHook',postWebHook)
   return app.use('/',router);
}

module.exports ={
    initWebRoutes
}