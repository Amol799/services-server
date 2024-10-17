const express = require("express");


const user_route = express();

const bodyParser = require('body-parser');
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));

const userController = require('../controllers/userController');
//send sms to user
user_route.post('/api/send-message',userController.sendMessage);
// login authentication
user_route.post('/api/login',userController.login);
//payment
user_route.post('/api/payment',userController.createPayment);
//send Email notification
user_route.post('/api/email',userController.createPayment);
module.exports = user_route;