const express = require('express');
const app = express();
const http = require('http');
var bodyParser = require("body-parser");
var path = require("path")
var uuid = require('uuid-random');


app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//COde I got from https://github.com/bradstondevcode/simple-node-chat-server-starter-code/blob/master/server.js

// Running our server on port 8080
var PORT  = process.env.PORT || 8080;

var server = app.listen(PORT, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Listening at http://%s:%s', 'localhost:', port);
});

var io = require('socket.io')(server);

app.use("/", (req, res) =>{
  res.send("hello world");
} )

var chatRoomData = [];
var connectedClients = {};

io.on('connection', (client) => {

  console.log("New client connected");

  //Client Sent a message
  client.on("SendMessage", (messageData) => {
    //add the new message to the message data array
    chatRoomData.push(messageData);
    //refresh everyone's chatbars so they see the new message
    sendUpdatedChatRoomData(client);
  })

  client.on("Login", (username)=>{
    console.log(username);
   client.emit("recieveLogin", username);
  });

   //Client entered The chat Room
   client.on("UserEnteredRoom", (userData) => {
    //notify everyone that someone new is entering the chatroom
    var enteredRoomMessage = {message: `${userData.username} has entered the chat`, username: "", userID: 0, timeStamp: null}
    chatRoomData.push(enteredRoomMessage)
    sendUpdatedChatRoomData(client)
    //add the new person to the list of connected users
    connectedClients[client.id] = userData

  })

   //Creating identity for new connected user
   client.on("CreateUserData", () => {
    let userID = uuid();

    let username = uniqueNamesGenerator({ dictionaries: [adjectives, names] });
    //create new user object
    var userData = {userID: userID, username: username}
    //send this new object to the setuserdata handler
    client.emit("SetUserData", userData)
  })

  //Player Disconnecting from chat room...
  client.on('disconnecting', (data) => {
    console.log("Client disconnecting...");

    if(connectedClients[client.id]){
      //notify the chat that a user exitted the room.
      //create the message
      var leftRoomMessage = {message: `${connectedClients[client.id].username} has left the chat`, username: "", userID: 0, timeStamp: null};
      //add the message to the array
      chatRoomData.push(leftRoomMessage);
      //refresh everyone's chatbar to echo the new message
      sendUpdatedChatRoomData(client);
      delete connectedClients[client.id]; //erase the person that left from the list of connected users
    }

  });

  //Clearing Chat room data from server
  client.on('ClearChat', () => {
    chatRoomData=[]; //delete all messages from the chatroom
    console.log(chatRoomData);
    //send this change to everyone.
    sendUpdatedChatRoomData(client);
  })

  });

  //Sending updated chat room data to all connected clients
const  sendUpdatedChatRoomData = (client) =>{
  //tell frontend to recieve a new chatbar
  client.emit("RetrieveChatRoomData", chatRoomData);
  client.broadcast.emit("RetrieveChatRoomData", chatRoomData);
}
