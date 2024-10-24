const express = require("express");

const user_route = express();

const bodyParser = require('body-parser');
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));

const userController = require('../controllers/userController');

const userDBOController = require('../controllers/userDBOController');
const productDBOController = require('../controllers/productDBOController');
//send sms to user
user_route.post('/api/send-message',userController.sendMessage);
// login authentication
user_route.post('/api/login',userController.login);
//payment
user_route.post('/api/payment',userController.createPayment);
//send Email notification
user_route.post('/api/sendemail',userController.snedEmail);

// user db opration
user_route.get('/api/get-users', userDBOController.getAllUsers);
user_route.post('/api/add-user', userDBOController.insertUser);
user_route.put('/api/update-user', userDBOController.updateUser);
user_route.delete('/api/delete-user', userDBOController.deleteUser);
user_route.put('/api/get-usersbyid', userDBOController.getUsersById);

// product db routes
user_route.get('/api/get-products', productDBOController.getAllProducts);
user_route.post('/api/add-product', productDBOController.insertProduct);
user_route.put('/api/update-product', productDBOController.updateProduct);
user_route.delete('/api/delete-product', productDBOController.deleteProduct);
user_route.put('/api/get-productbyid', productDBOController.getProductById);

module.exports = user_route;