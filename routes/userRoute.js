const express = require("express");

const user_route = express();

const bodyParser = require('body-parser');
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));

const userController = require('../controllers/userController');

const userDBOController = require('../controllers/userDBOController');

//send sms to user
user_route.post('/api/send-message',userController.sendMessage);
// login authentication
user_route.post('/api/login',userController.login);
//payment
user_route.post('/api/payment',userController.createPayment);
//send Email notification
user_route.post('/api/sendemail',userController.snedEmail);

// user db oprations

user_route.get('/api/get-users', userDBOController.getAllUsers);
user_route.post('/api/add-user', userDBOController.insertUser);
user_route.put('/api/update-user', userDBOController.updateUser);
user_route.delete('/api/delete-user', userDBOController.deleteUser);
user_route.put('/api/get-usersbyid', userDBOController.getUsersById);
module.exports = user_route;