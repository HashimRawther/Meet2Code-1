
const http = require('http');
const express = require('express');
const app = express();
const path=require('path');
const server = http.createServer(app);
const {ExpressPeerServer} = require('peer');

app.use(express.static(path.join(__dirname)));


const peerServer = ExpressPeerServer(server, {
    proxied: true,
    debug: true,
    path: '/peerjs',
    ssl: {}
});

app.use(peerServer);

peerServer.on('connection',(client) => {
})

server.listen(8080,()=>{
    console.log("Server listening on port 8080");
});