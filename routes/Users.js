const express = require("express"); 
const status = require("http-status");
const bcrypt = require("bcrypt");
const usersController = require("../controllers/Users"); 
var validator = require("email-validator");
const router = express.Router();
const validators = require("../models/validator");
const users = require("../models/Users");
 

router.get("/users", async (req, res) => {
  let users = await usersController.onGetAllUsers();
  const results = users.map(item => { return {
  username: item.username,
  id:item._id,
  email: item.email}});
  res.status(status.OK).send(results);
});
 
 

router.get("/users/:_id", async (req, res) => { 
  try {
    const user = await usersController.onGetUserById(req.params._id);
    if (!user) {
      return res.status(status.BAD_REQUEST).send({
        error: {
          code: "400",
          message: "User not found"
      }});
    }
    res.status(status.OK).send({username:user.username,email:user.email,id :user._id});
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).send({
      error: {
        code: "500",
        message: "Some ", 
      },
    });
  }
});

router.post("/users", async (req, res) => {
  try {
    const password =bcrypt.hashSync(req.body.password,10);
    const { error, valid, data } = validators.userFieldValidator({
      ...req.body,
     password:password
    });
    if (!valid) {
      return res.status(status.BAD_REQUEST).send({
        error: {
          code: "400",
          message: "Invalid data!",
          paths: error,
        },
      });
    }
    const user = await usersController.onCreateUser(data);
    delete user.password
    res.status(status.OK).send({email:user.email,username:user.username,id:user._id});
  } catch (error) {
    console.log(JSON.stringify(error.message, null, 2));
    res.status(status.INTERNAL_SERVER_ERROR).send({
      error});
  }
});

router.delete("/users/:_id", async (req, res) => {
  
   const deleteUser =await usersController.onDeleteUserById(req.params._id);

    if (!deleteUser) {
      return res.status(404).json({}); 
    }
    res.status(status.OK).send({email:deleteUser.email,username: deleteUser.username,id:deleteUser._id});
  
});

 

module.exports = router;
