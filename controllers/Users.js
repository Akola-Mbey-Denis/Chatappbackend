const mongoose = require("mongoose");
const passport = require("passport");
const Users = require("../models/Users");

module.exports = {
  //get user data using email
  onGetUserByEmail: async (email) => {
    const user = await Users.findOne({ email: email });
    if (!user) throw { error: "No user with this id found" };
    return user;
  },
  //get user data using user id
  onGetUserById: async (id) => {
    // const result = await Users.findById({ id: id });
    const result = await Users.findOne({ _id: id });
    return result;
  },
  //get all users in database
  onGetAllUsers: async () => {
    const users = await Users.find();
    return users;
  },
  //delete user by Id
  onDeleteUserById: async (id) => {
    const userToDelete =await Users.findOne({_id:id});
  if (!userToDelete)  {
    throw{error:'User with the specified Id for found!'}
  }
    const user = await Users.findByIdAndDelete({ _id: id });
    return user;
  },
  //create user
  onCreateUser: async (data) => {
    console.log(data.email)
    const findUser= await Users.findOne({email: data.email});
    if (findUser){
      throw {error: 'User with such email already exist!'}
    }
    const user = new Users(data);
    return user.save();
  },
};
