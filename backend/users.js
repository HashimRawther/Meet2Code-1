const users = [];
const datas = {};
const addUser =({id,name,room}) =>{
    name=name.trim().toLowerCase();
    room=room.trim().toLowerCase();
    const existingUser = users.find((user)=> user.room === room && user.name===name);
    if(existingUser)
    {
        return {error:'Username is taken'};
    }
    const user = {id,name,room};
    users.push(user);
    return {user};
}
const setData=(room,data)=>{
    datas[room]=data;
}
const getData = (room)=>{
        if(datas[room]===undefined)
        {
            setData(room,"");
        }
        return datas[room];
    }
const removeUser = (id) =>{
    const index = users.findIndex((user)=>user.id===id);
    if(index!==-1)
    {
        return users.splice(index,1)[0];
    }
}

const getUser =(id) => users.find((user)=>user.id===id)

const getUsersInRoom = (room) => users.filter((user)=>user.room===room);

module.exports= {addUser,removeUser,getUser,getUsersInRoom,getData,setData};