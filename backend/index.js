const {addUser,removeUser,getUser,getUsersInRoom, setData, getData} = require('./users');

const express=require("express");
      app=express();
      bodyParser=require("body-parser");
      cors=require("cors");
      socket=require("socket.io");
      http=require("http");
      oauth=require('./Routers/oauth');
      room=require('./Routers/room');
      path=require('path');
      session = require("express-session");
      Room=require('./Schemas/room')
const { v4: uuid } = require('uuid');

const Document = require("./Schemas/Document")

const PORT = process.env.PORT || 9000;

const router = require('./Routers/router');

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

let loggedinUserDetails=(req,res,next)=>{
    let loggedin=0;
    let user={};
    if(req.session.loggedin==true){
        loggedin=1;
        user=req.session.user;
    }
    res.locals={user:user,loggedin:loggedin};
    next();
}
app.use(loggedinUserDetails);

let isLoggedin=(req,res,next)=>{
    if(req.session.loggedin)
        next();
    else
    {     
          // res.status(404).json({"log_data":"Not logged in",...res.locals})
          res.status(401).send("Not logged in");
    }
}

//Check if the user is not already logged in
let notLoggedin=(req,res,next)=>{
    // console.log(req.session)
    if(req.session.loggedin==undefined || req.session.loggedin==null)
        next();
    else
        res.status(404).json({log_data:"Already logged in",...res.locals})
}
const server = http.createServer(app);
const io = socket(server);

const defaultValue = ""

io.on('connection',(socket)=>{
    socket.on('createRoom',async(arg,redirect)=>{
        let roomId=uuid();
        console.log(roomId)
        socket.join(`${roomId}`);
        try{
        let room=new Room({
            ...arg,
            roomId:roomId
        })
        room=await room.save()
        redirect(roomId);
        }
        catch(e){
            redirect(undefined)
        }
    })

    socket.on('test',arg=>{
        console.log(socket.rooms)
    })
    
    socket.on('closeConnection',arg=>{
        socket.leave(`${arg.room}`)
    })
    socket.on('join',({name,room},callback)=>{
        const {error,user}= addUser({id:socket.id,name,room});
        if(error) return callback(error);
        socket.join(user.room);
        data=getData(user.room);
        socket.emit('message',{user:'admin',text:`${user.name},welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name}, has joined`});
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        io.to(user.room).emit('canvas-data',data);
        callback();
    });
    socket.on('canvas-data',(data)=>{
        const user = getUser(socket.id);
        setData(user.room,data);
        io.to(user.room).emit('canvas-data',data);
    });
    socket.on('sendMessage',(message,callback)=>{
        const user = getUser(socket.id);
        io.to(user.room).emit('message',{user:user.name,text:message});
        callback();
    })
    socket.on("get-document", async documentId => {
        const document = await findOrCreateDocument(documentId)
        socket.join(documentId)
        if(document !== undefined)
        socket.emit("load-document", document.data)

        socket.on("send-changes", delta => {
            socket.broadcast.to(documentId).emit("receive-changes", delta)
        })

        socket.on("save-document", async data => {
            await Document.findByIdAndUpdate(documentId, { data })
        })
    })
    socket.on('disconnect',()=>{
        const user= removeUser(socket.id);
        if(user){
            io.to(user.room).emit('message',{user:'admin',text:`${user.name}, has left`});
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
    });
});


async function findOrCreateDocument(id) {
    if (id == null) return
  
    const document = await Document.findById(id)
    if (document) return document
    return await Document.create({ _id: id, data: defaultValue })
}

app.set('socketio',io)

app.use('/oauth',oauth);
app.use('/room',room);
server.listen(PORT,()=>{
    console.log('Server started on port: ',PORT);
});