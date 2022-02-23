const express = require('express');
const {postWebHook,getWebHook} = require('../controllers/chatBotController')
const router = express.Router()
const homepageController = require('../controllers/homepageController');
const {Sequelize,Model, DataTypes} = require("sequelize");

const user = process.env.PLSQL_USER;
const host = process.env.PLSQL_HOST;
const database = process.env.PLSQL_DATABASE;
const password = process.env.PLSQL_PASSWORD;
const port = process.env.PLSQL_PORT;

const connection = new Sequelize(process.env.DATABASE_URL)

connection.sync()
  
connection
     .authenticate()
     .then(() => {
      console.info('INFO - Database connected.')
     }).catch(()=>{
       console.info("Error in conncting with database")
     })

let initWebRoutes = (app)=>{
   router.get('/',homepageController.getHomePage);
   router.get('/webHook',getWebHook);
   router.post('/webHook',postWebHook)
   return app.use('/',router);
}

module.exports ={
    initWebRoutes
}