let terminateUser = (socket) =>{
    socket.disconnect();
}

module.exports.terminateUser = terminateUser;