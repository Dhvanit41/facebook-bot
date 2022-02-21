require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser');
const viewEngine = require('./config/viewEngine')
const {initWebRoutes} = require('./routes/web');

const PORT = 8082 || 3001;

const app = express();
viewEngine(app)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

initWebRoutes(app);

let port = process.env.PORT || 8082;

app.listen(port,()=>{
    console.log("app is runnig at port",port)
})