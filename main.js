const socketIo = require("socket.io");
 
const session = require("express-session");
//mongo config
require("./config/mongo");  
const express = require("express");
 
//outes
const messageRouter = require("./routes/Messages");
const userRouter = require("./routes/Users");  
const app = express();
app.use(express.json());
//express session
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));
 
app.use(express.urlencoded({ extended: false })); 
 
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
 
var server = app.listen(process.env.PORT || 8007, () => {
  console.log("server started runing on port 8007");
});

io = socketIo(server); 
 

app.set("socketio", io); 

app.use("/api/v1", userRouter);
app.use("/api/v1", messageRouter);  

app.use(function (req, res, next ) {
  const error = new Error("Page not found");
  error.status = 404;
  next(error);
});

app.use(function (error, req, res, next) {
  console.log(error);
  res.status(error.status || 500);
  if (error.status != 404) {
    res.json({
      error: error.status,
      message: "Internal server error",
    });
  } else {
    res.json({ error: error.status, message: error.message });
  }
});
