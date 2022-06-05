
/**
 * @type {any}
 */
const WebSocket = require('ws')
const http = require('http')
const setupWSConnection = require('y-websocket/bin/utils').setupWSConnection;

const port = 1234;

const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Server is up and running!')
})


 
//  const staticServer = new StaticServer('../', { cache: production ? 3600 : false, gzip: production })
 
 const server = http.createServer(app)
 const wss = new WebSocket.Server({ server })
 
 wss.on('connection', (conn, req) => {
   setupWSConnection(conn, req, { gc: req.url.slice(1) !== 'prosemirror-versions' })
 }
 )
 
 server.listen(port,()=>{
  console.log('Server started on port: ',port);
})
