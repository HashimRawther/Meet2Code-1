const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const cors=require("cors");
const socket=require("socket.io");
const http=require("http");
const path=require('path');
const session = require("express-session");
const mongoose = require("mongoose");
const Room=require('./Schemas/room');
const User=require('./Schemas/user');
const { v4: uuid } = require('uuid');
const cheerio = require("cheerio");

const PORT = process.env.PORT || 9000;

const router = require('./Routers/router');
const oauth=require('./Routers/oauth');
const {loggedinUserDetails,isLoggedin,notLoggedin} = require('./Components/loginDetails');
const terminate = require('./Components/terminate');

const leaveRoom = require('./SocketListener/leaveRoom');

app.use(router);
app.use(cors({credentials:true, origin:["http://localhost:3000"]}));
app.options('*', cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({limit: '50mb'}));   
app.use(express.static(path.join(__dirname,'/public')));

app.use(session({
    resave:true,
    secret:"Failures are the stepping stones of success",
    saveUninitialized:true,
    name:"meet2codeCookie",
    cookie : {
          maxAge: 1000* 60 * 60 *24 * 365,
          secure:false,
      }

}))

const server = http.createServer(app);
const io = socket(server,{cors: {
    cors: true,
      origins: ["http://localhost:3000","192.168.0.13:3000","https://60a2be5a6ea5e300a1a9aca2--elegant-edison-5499d4.netlify.app"],
      methods: ["GET", "POST"]
    }
});
app.set('socketio',io);

app.use('/oauth',oauth);

server.listen(PORT,()=>{
    console.log('Server started on port: ',PORT);
});
app.use(loggedinUserDetails);

io.on('connection',(socket)=>{
    console.log('hello');
    leaveRoom.leaveRoomListener(io,socket,User,Room);
    // terminate.terminateUser(socket);
});
