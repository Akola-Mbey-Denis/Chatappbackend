const mongoose =require('mongoose'); 
var Schema = mongoose.Schema;
const userSchema  = new Schema({
   username:{
     type:mongoose.SchemaTypes.String,
     required: true,
     unique:true,
   },

  email:{
    type:mongoose.SchemaTypes.String,
    required: true,
    unique:true,
  },
  password:
  {
    type: mongoose.SchemaTypes.String,
    required:true,
  }
},{timestamps:true}) ; 
 
module.exports = mongoose.model('User', userSchema);
