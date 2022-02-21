const express = require('express');
const {postWebHook,getWebHook} = require('../controllers/chatBotController')
const router = express.Router()

let initWebRoutes = (app)=>{
   router.get('/',(req,res)=>{
       res.send("hello world")
   });
   router.get('/webHook',getWebHook);
   router.post('/webHook',postWebHook)
   return app.use('/',router);
}

module.exports ={
    initWebRoutes
}