const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const {addUser,removeUser,getUser,getUsersInRoom, setData, getData} = require('./users');

const mongoose = require("mongoose")
const Document = require("./Document")

mongoose.connect("mongodb://localhost/google-docs-clone", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

const PORT = process.env.PORT || 5000;

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);
app.use(cors());

const defaultValue = ""

io.on('connection',(socket)=>{
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


server.listen(PORT,()=>{
    console.log('Server started on port: ',PORT);
});