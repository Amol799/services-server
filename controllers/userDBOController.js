const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./user_database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the user_database database.');

  // Create the users table if it doesn't exist
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT  NULL,
    email TEXT  NULL,
    password TEXT  NULL,
    mobile TEXT UNIQUE NOT NULL,
    address TEXT NULL

  )`, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
});

// Insert a new user into the users table

const insertUser = (req, res) => {
  try{
    console.log('name : ' + req.body.name + ' Email : ' + req.body.email +
      ' Password : ' + req.body.password + ' address : ' + req.body.address + 
      ' Inserting user' + req.body.mobile);
     const { name, email, password, mobile, address } = req.body;

     db.run(`INSERT INTO users (name, email, password, mobile, address) VALUES (?, ?, ?, ?, ?)`, [name, email, password, mobile, address], function (err) {
      if (err) {        
        res.status(401).json({ error: err.message });
      } else {
        res.status(200).json(this.lastID);        
      }
    });
  }
  catch(error){
      return res.status(400).json({ success: false, msg: error.message });
  }
}
const updateUser = (req, res) => {
  try{
    console.log('name : ' + req.body.name + ' Email : ' + req.body.email + ' Password : ' + req.body.password + ' address : ' + req.body.address + ' Inserting user' + req.body.mobile);
     const { name, email, password, mobile, address } = req.body;
     db.run(`UPDATE users SET name = ?, email = ?, password = ?, address = ? WHERE mobile = ?`, [name, email, password, address, mobile], function (err) {
      if (err) {        
        res.status(401).json({ error: err.message });
      } else {
        res.status(200).json(this.changes);        
      }
    });
  }
  catch(error){
      return res.status(400).json({ success: false, msg: error.message });
  }
}
const deleteUser = (req, res) => {
  try{
    console.log(' Deleting user' + req.body.mobile);
     const {  mobile } = req.body;
     db.run(`DELETE FROM users WHERE mobile = ?`, [mobile], function (err) {
      if (err) {        
        res.status(401).json({ error: err.message });
      } else {
        res.status(200).json(this.changes);        
      }
    });
  }
  catch(error){
      return res.status(400).json({ success: false, msg: error.message });
  }
}
const getAllUsers = (req, res) => {
  try{
    
    console.log('Fetching all users');
    db.all(`SELECT * FROM users`, [], (err, rows) => {
      if (err) {        
        res.status(401).json({ error: err.message });       
      } else {
        res.status(200).json({rows});        
      }
      console.log("result: " + JSON.stringify({rows}));
    });
  }
  catch(error){
      return res.status(400).json({ success: false, msg: error.message });
  }
}
const getUsersById = (req, res) => {
  try{
    const { name, email, password, mobile, address } = req.body;
    console.log('Fetching users by id and mobile is');
    db.all(`SELECT * FROM users WHERE mobile = ?`, [mobile], (err, rows) => {
      if (err) {        
        res.status(401).json({ error: err.message });       
      } else {
        res.status(200).json({rows});        
      }
      console.log("result: " + JSON.stringify({rows}));
    });
  }
  catch(error){
      return res.status(400).json({ success: false, msg: error.message });
  }
}


// Close the database connection when the application exits
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Closed the database connection.');
    process.exit();
  });
});

module.exports = {
  insertUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getUsersById  
};