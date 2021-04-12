const mongoose = require("mongoose");
const Messages = require('../models/Messages');
const Users =require('../models/Users');
var _ = require("lodash");

module.exports={
  //get all messages
  onGetAllMessages: async()=>
  {
    try {
      const messages = Messages.find();
      return messages;
    } catch (error) {
      throw error;
    }
  },
  onGetMessageBySenderAndReceiver: async(sender_id,receiver_id) =>
  {
    try{
       const messages = await Messages.find({
         sender: sender_id,
         receiver: receiver_id,
       });
       return messages;

    }
    catch(error)
    {
      throw error;
    }
   


  },

  onGetMessageSenderAndReceiver: async(id)=>
  {
  const message = await Messages.findOne({ _id: id });
  const senderData =await Users.findById({_id: message.sender});

  const receiverData = await Users.findById({ _id: message.receiver}); 
  var sender=_.pick(senderData,['_id','username','email']);
  var receiver  =_.pick(receiverData,['_id','username','email'])
//  var receiver_formatted={'receiver_name':receiver.username,'receiver_id':receiver._id}
  return {'receiver_name':receiver.username,'receiver_id':receiver._id,'sender_name':
sender.username,'sender_id':sender._id}

  },
  //get message by ID
  onGetMessageByID: async(id)=>
  {
   
      const message = await Messages.findOne({ _id: id });
      if (!message) throw { error: "No message with this id found" };
      return message;
    
    
  },
   
  //delete message by specifying the message ID
  onDeleteMessageById: async(id)=>
  {
    
      const message = await Messages.findOneAndDelete({_id: id });
      if (!message) throw { error: "No message with this id found" };
      return message;
    
  },
  //create a new message  
  onCreateMessage: async(payload)=>{
   
      
       const messagecreate = await Messages(payload);
        
       return messagecreate.save();
    
     }

  } 

 
 