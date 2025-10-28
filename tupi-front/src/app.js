const express = require("express");
const app = express();
const path = require("path")
app.use(express.static(path.join(__dirname,'../public')));
// console.log(__dirname)

// configurar handlebars
const handlebars = require('express-handlebars');
app.engine('handlebars', handlebars.engine('main'));
app.set('view engine', 'handlebars');
app.set('views', './views');


//configuração Body-Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// session
var session = require('express-session')
app.use(session({
    secret:"tupikey",
    resave: false,
    saveUninitialized: true,
}));
module.exports = {
    app,
    session
}