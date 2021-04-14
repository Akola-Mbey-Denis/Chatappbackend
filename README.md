# Chatappbackend
 

This is a nodejs chat app using socket.io and mongodb (Atlas) .
The  app was deployed on heroku  it has the following end points
# users model api endpoints
-[create a user](https://aqueous-taiga-66714.herokuapp.com/api/v1/users/) using pPOST HTTPS request method
-[get a user](https://aqueous-taiga-66714.herokuapp.com/api/v1/users/:id) using GET HTTPs request method and a specified user ID 
-[delete a user](https://aqueous-taiga-66714.herokuapp.com/api/v1/users/:id) specified the id of the user and use DELETE HTTPS request method
-[get all users] (https://aqueous-taiga-66714.herokuapp.com/api/v1/users/) using GET HTTPS request method
 # messages model api endpoints
 -[create a message] (https://aqueous-taiga-66714.herokuapp.com/api/v1/messages/) using HTTPS POST request method and  with a specific message payload (sender_id,reciever_id,and the message)
 -[Get all messages] (https://aqueous-taiga-66714.herokuapp.com/api/v1/messages/ using the HTTPS GET request method,it returns  all messages in the database.
 -[Get messages specific to two users] (https://aqueous-taiga-66714.herokuapp.com/api/v1/messages/sender_id/receiver_id) using the HTTPS GET reuest method with specific sender and receiver ids.
 [Delete a message] (https://aqueous-taiga-66714.herokuapp.com/api/v1/messages/message_id) using HTTPS DELETE method,it returns  deletes the specified message in the database. 
 

You can find a running version of the backend app at https://aqueous-taiga-66714.herokuapp.com!

Libraries used:

- [socket.io](https://github.com/socketio/socket.io)
- [jQuery](https://github.com/jquery/jquery)
- [express](https://github.com/expressjs/express)
- [moongose](https://aqueous-taiga-66714.herokuapp.com)- 
- [Moment.js](https://github.com/moment/moment)
- [Auth0] (Which handles user registration in the frontend)

# Running application
- Build the install docker and run the following commands:
- docker build -t chatappbackend .
- docker run -p 8007:8007 chatappbackend to run the application locally- 
Thank you,
Denis Mbey Akola
