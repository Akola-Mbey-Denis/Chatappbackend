const mongoose =require('mongoose')
var Schema = mongoose.Schema;
const MessagesSchema = new Schema({
  
  sender:{
    type:String,
    required:true,
  },
  receiver:
  {
    type:String,
    required:true,
  },
  message:{
    type:mongoose.SchemaTypes.Mixed,
    required: true,
  }
  
},{timestamps: true}); 
 
module.exports = mongoose.model('Messages', MessagesSchema);
 