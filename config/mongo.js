const databaseConfiguration = require('./index');
const CONNECTION_STRING=databaseConfiguration;
const CONNECTION_URL= "mongodb+srv://denis:"+CONNECTION_STRING.DB_PASSWORD+"@cluster0.hjmrk.mongodb.net/"+CONNECTION_STRING.DB_NAME+"chat?retryWrites=true&w=majority";  
   
const mongoose = require("mongoose");

mongoose.connect(CONNECTION_URL, function (err, client) {
  if (err) {
    console.log("Error occurred while connecting to MongoDB Atlas...\n", err);
  }
  console.log("Connected...");
});
