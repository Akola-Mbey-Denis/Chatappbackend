const express = require("express"); 
const status = require("http-status"); 
const messageController = require("../controllers/Messages");
const userController =require("../controllers/Users"); 
const router = express.Router();
router.get("/messages", async (req, res) => {
  let messages = await messageController.onGetAllMessages();
  const results = await Promise.all(messages.map( async(item) => {
     const messageData =await messageController.onGetMessageSenderAndReceiver(item._id)
     return {
       id :item._id,
       ...messageData,
       message: item.message,
     };
   }))

 
  res.status(status.OK).send(results);
});
router.get("/messages/:sender_id/:receiver_id",async(req,res)=>
{
  let messages = await messageController.onGetMessageBySenderAndReceiver(req.params.sender_id,req.params.receiver_id);
  const results = await Promise.all(
    messages.map(async (item) => {
      const messageData = await messageController.onGetMessageSenderAndReceiver(
        item._id
      );
      return {
        id: item._id,
        ...messageData,
        message: item.message,
      };
    })
  );
  res.status(status.OK).send(results);

   
});

router.get("/messages/:id", async (req, res) => {


  try {
    const message = await messageController.onGetMessageByID(req.params.id) ;
    
    if (!message) {
      return res.status(status.BAD_REQUEST).send({
        error: {
          code: "400",
          message: "User not found!",
        },
      });
    }
   const messageData = await messageController.onGetMessageSenderAndReceiver(
     req.params.id
   );
    res.status(status.OK).send({message: message.message,...messageData});
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).send({
      error: {
        code: "500",
        message: "Something went wrong!",
      },
    });
  
}});
 
router.post("/messages", async (req, res) => {
  const data = req.body;

  console.log(data);
  try {
    const sender = await userController.onGetUserById(data.sender);
     const receiver = await userController.onGetUserById(data.receiver);
     if (!sender)
     {
        return res.status(status.BAD_REQUEST).send({
          error: {
            code: "400",
            message: "Invalid sender!",
          },
        });

     }

     if (!receiver) {
       return res.status(status.BAD_REQUEST).send({
         error: {
           code: "400",
           message: "Invalid receiver id!",
         },
       });
     }     
    const message = await messageController.onCreateMessage({ ...data });
    res.status(status.CREATED).send({ id: message._id,sender:message.sender,receiver:message.receiver,id: message._id});
  } catch (err) {
    res.status(status.BAD_REQUEST).send(err);
  }
});

router.delete("/messages/:_id", async (req, res) => {
  const message =await messageController.onDeleteMessageById(req.params._id);
  res.status(status.ACCEPTED).send({message: message.message, id: message._id, sender:message.sender,receiver: message.receiver,id: message._id});
});

module.exports = router;
