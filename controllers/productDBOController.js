const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./product_database.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the user_database database.');

  // Create the users table if it doesn't exist
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT UNIQUE NOT NULL,
    discount INTEGER  NULL,
    mrpprice INTEGER NOT NULL,
    description TEXT  NOT NULL,
    category TEXT NOT NULL,
    image TEXT NOT NULL,
    mianProduct INTEGER  NOT NULL,
    rating_rate INTEGER NULL,
    rating_count INTEGER NULL,
    other TEXT NULL,
    isActive INTEGER NOT NULL
  )`, (err) => {
    if (err) {
      console.error(err.message);
    }
  });
});

// Insert a new user into the users table

const insertProduct = (req, res) => {
  try{
    console.log('title : ' + req.body.title + ' discount : ' + req.body.discount +
      ' mrpprice : ' + req.body.mrpprice + ' description : ' + req.body.description + 
      ' category : ' + req.body.category + ' image : ' + req.body.image + 
      ' mianProduct : ' + req.body.mianProduct + ' rating_rate : ' + req.body.rating_rate + 'rating_count :' + req.body.rating_count);
     const { title, discount, mrpprice, description, category, image, mianProduct, rating_rate, rating_count, other, isActive} = req.body;

     db.run(`INSERT INTO products (title, discount, mrpprice, description, category, image, mianProduct, rating_rate, rating_count, other ,isActive ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
        [title, discount, mrpprice, description, category, image, mianProduct, rating_rate, rating_count, other ,isActive], function (err) {
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
const updateProduct = (req, res) => {
  try{
    console.log('title : ' + req.body.title + ' discount : ' + req.body.discount +
        ' mrpprice : ' + req.body.mrpprice + ' description : ' + req.body.description + 
        ' category : ' + req.body.category + ' image : ' + req.body.image + ' id : ' + req.body.id + 
        ' mianProduct : ' + req.body.mianProduct + ' rating_rate : ' + req.body.rating_rate + 'rating_count :' + req.body.rating_count);

    const { title, discount, mrpprice, description, category, image, mianProduct, rating_rate, rating_count, other, isActive, id } = req.body;
     db.run(`UPDATE products SET title = ?, discount = ?, mrpprice = ?, description = ?, category = ?, image = ?, mianProduct = ?, rating_rate = ?, rating_count = ?, other = ?, isActive = ? WHERE id = ?`,
         [title, discount, mrpprice, description, category, image, mianProduct, rating_rate, rating_count, other, isActive, id], function (err) {
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
const deleteProduct = (req, res) => {
  try{
    console.log(' Deleting products' + req.body.id);
     const {  id } = req.body;
     db.run(`DELETE FROM products WHERE id = ?`, [id], function (err) {
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
const getAllProducts = (req, res) => {
  try{
    
    console.log('Fetching all products...');
    db.all(`SELECT * FROM products`, [], (err, rows) => {
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
const getProductById = (req, res) => {
  try{
    const { id } = req.body;

    console.log('Fetching products by id and id is' +  req.body.id);

    db.all(`SELECT * FROM products WHERE id = ?`, [id], (err, rows) => {
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
  insertProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById  
};