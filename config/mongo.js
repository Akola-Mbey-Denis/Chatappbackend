const databaseConfiguration = require('./index');
 
const CONNECTION_URL= databaseConfiguration.DATA_BASE_URL; 
   
const mongoose = require("mongoose");

mongoose.connect(CONNECTION_URL, function (err, client) {
  if (err) {
    console.log("Error occurred while connecting to MongoDB Atlas...\n", err);
  }
  console.log("Connected...");
});
