const express = require('express');
const {postWebHook,getWebHook} = require('../controllers/chatBotController')
const router = express.Router()
const homepageController = require('../controllers/homepageController')
let initWebRoutes = (app)=>{
  // router.get('/',homepageController.getHomePage);
  router.get("/",(req,res)=>{
      return res.send("hello world")
  })
   router.get('/webHook',getWebHook);
   router.post('/webHook',postWebHook)
   return app.use('/',router);
}

module.exports ={
    initWebRoutes
}