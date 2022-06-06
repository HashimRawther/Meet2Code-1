
const http = require('http');
const express = require('express');
const app = express();
const path=require('path');
const server = http.createServer(app);
const {ExpressPeerServer} = require('peer');

const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname)));


const peerServer = ExpressPeerServer(server, {
    proxied: true,
    debug: true,
    path: '/peerjs',
    ssl: {}
});

app.use(peerServer);


app.get('/',(req,res)=>{
    console.log('hi');
})


peerServer.on('connection',(client) => {
})

server.listen(port,()=>{
    console.log("Server listening on port 8080");
});