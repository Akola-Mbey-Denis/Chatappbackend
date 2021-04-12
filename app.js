const express = require("express");
require('./config/mongo');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const indexRouter = require("./routes/index");
const messageRouter = require("./routes/Messages");
const usersRouter = require("./routes/Users");

app.use("/api/v1", indexRouter);
app.use("/api/v1", messageRouter);
app.use("/api/v1", usersRouter);

module.exports = app;
