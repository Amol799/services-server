require('dotenv').config();
const cors = require("cors");
const express = require("express");
const app = express();
app.use(cors({ origin: "*" }));
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });
// //for user routes
const userRoute = require("./routes/userRoute");
 app.use('/',userRoute);

app.listen(3000,function(){
    console.log("Server is running");
});

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Wellcome to akshaj oil </h1>"
  );
});
// const express = require('express');
// const app = express();



// app.use(express.json());

// Define the login endpoint
// app.post('/api/login', (req, res) => {
//     console.log('body: ' + req.body);
//     console.log('username: ' + req.body.username);
//     console.log('password:'+ req.body.password);

//     const { username, password } = req.body;

//   // Perform authentication logic here
//   // For example, you can compare the username and password with your database records
//   if (username === '7396609490' && password === '1234') {
//     // If the credentials are valid, generate a token and send it in the response
//     const token = generateToken(username); // Replace this function with your own token generation logic
//     console.log('Tokeen token generated : ' + token);
//     res.status(200).json({ token });
//   } else {
//     // If the credentials are invalid, send an error response
//     res.status(401).json({ error: 'Invalid credentials' });
//   }
// });

// Start the server
//const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// Function to generate a token (replace this with your own logic)
function generateToken(username) {
  // You can use a library like jsonwebtoken to generate a JWT token
  // Here's an example using jsonwebtoken:
  const jwt = require('jsonwebtoken');
  const token = jwt.sign({ username }, 'your_secret_key', { expiresIn: '1h' });
  return token;

  // For simplicity, in this example, we'll just return a hardcoded token
  
}