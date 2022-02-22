const express = require("express");
const path = require("path");
let configViewEngine = (app) => {
  console.log(path.join(__dirname,"..","public"));
  app.use(express.static(path.join(__dirname,"..", "public")));
  app.set("views", path.join(__dirname,"..", "views"));
  app.set("view engine", "html");
};

module.exports = configViewEngine;
