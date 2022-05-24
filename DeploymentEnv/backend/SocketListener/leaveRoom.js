 
let leaveRoomListener = (io,socket,User,Room)=>{
    console.log('Socket listening on leaveRoom',socket.id);
    socket.on('leaveRoom',async(arg,redirect)=>{
        try{
            //Get the details of user who emitted the event
            let user=await User.findById(arg.host);
            let room=await Room.findById(user['room']);
            // console.log(room['host'],arg.host);
            if(room!==undefined && room!==null){
                //Delete the room if the host has ended the meeting
                // console.log(room['host'],mongoose.Types.ObjecId(arg.host))
                io.to(room['roomId']).emit('message',{user:'',text:`${user['login']}, has left`});
                io.to(room['roomId']).emit('userLeft', {user: user});
                if(room['host']==(arg.host)){
                    //Emit an end room event to all participants of the room 
                    // socket.to(room['roomId']).emit('endRoom')
                    await Room.findByIdAndDelete(room._id)
                    await Document.findByIdAndDelete(room['roomId'])
                }
                //Remove the participant from the room
                else{
                    room['participants'].splice(room['participants'].indexOf(user._id),1);
                    // console.log(room);
                    await room.save();
                }
                //Remove the room from the user
                io.to(user['room']).emit('message',{user:'',text:`${user.name}, has left`});
                user['room']=undefined
                await user.save()
                redirect("Success",200)
            }
        }
        catch(e){
            console.log(e)
            redirect(undefined,404)
        }
    })
 }

 module.exports.leaveRoomListener = leaveRoomListener;