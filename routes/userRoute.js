const express = require("express");


const user_route = express();

const bodyParser = require('body-parser');
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));

const userController = require('../controllers/userController');

user_route.post('/send-message',userController.sendMessage);

user_route.post('/api/login',userController.login);

user_route.post('/api/payment',userController.createPayment);

module.exports = user_route;