import React,{useState,useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import Chat from './Modules/Chat/Chat/Chat';

import './Meet.css';
import Participant from './Modules/Participants/Participant';
import Container from './Modules/Whiteboard/container/Container';

let socket;

const Meet = () => {
    const [page,setpage] = useState(0);
    const [com,setCom] = useState(0);
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
    const [messages,setMessages] = useState([]);
    const [message,setMessage] = useState('');
    const [usersInRoom,setUsersInRoom] = useState([]);
    const [flag,setFlag] = useState(true);
    const [ctx,setctx] = useState();
    const [timeout,settimeOut] = useState();
    const [image,setImage] = useState();
    const ENDPOINT = 'http://localhost:5000';
    useEffect(()=>{
        const {name,room} =queryString.parse(window.location.search);
        var connectionOptions =  {
            "force new connection" : true,
            "reconnectionAttempts": "Infinity", 
            "timeout" : 10000,                  
            "transports" : ["websocket"]
        };
        socket = io(ENDPOINT,connectionOptions);
        setName(name);
        setRoom(room);

        socket.emit('join',{name,room},()=>{
        });
        socket.emit('newuser');
        
        return () =>{
            // socket.emit('disconnect');
            socket.off();
        }
    },[ENDPOINT]);
    useEffect(()=>{
        socket.on("canvas-data",function(data){
            var image= new Image();
            image.onload=function(){
                ctx.drawImage(image,0,0);
            };
            image.src = data;
            setImage(image);
        })
        return()=>{
            socket.off();
        }
    },[ctx])
    useEffect(()=>{
        socket.on('userjoined',function(users){
            setUsersInRoom(users);
            console.log("hello");
        });
        return() => {
            socket.off();
        }
    },[usersInRoom])
    useEffect(()=>{
        socket.on('message',(message)=>{
            setMessages([...messages,message]);
        })
        return() => {
            socket.off();
        }
    },[messages]);

    const sendMessage=(e)=>{
        e.preventDefault();
        if(message){
            socket.emit('sendMessage',message,()=>setMessage(''));
        }
    }
    return (  
        <div className='meet'>
            <div className='logo-container'>
                <h1>{room}/{name}</h1>
            </div>
            <div className='useroptions-container'></div>
            <div className='communication-container'>
                <div className="com-navbar">
                    <button onClick={()=>setCom(0)}>1</button>
                    <button onClick={()=>setCom(1)}>2</button>
                    <button onClick={()=>setCom(2)}>3</button>
                </div>
                <div className="com-overview">
                    {
                        com === 0?(
                            <div className='VideoArea'></div>
                        ):
                        ( 
                            com===1?
                            <div className="ChatArea"><Chat messages={messages} name={name} message={message} setMessage={setMessage} sendMessage={sendMessage}/></div>
                            :<div className="ParticipantsArea"><Participant users={usersInRoom}/></div>
                        )
                    }
                </div>
            </div>
            <div className='workspace-container'>
                <div className="work-choice-bar">
                    <button onClick={()=>setpage(0)}>1</button>
                    <button onClick={()=>setpage(1)}>2</button>
                    <button onClick={()=>setpage(2)}>3</button>
                </div>
                
                <div className="inner-workspace">
                    {
                        page === 0?(
                            <div className='codeArea'>
                                <div className='directory-container'></div>
                                <div className='code-container'></div>
                                <div className='terminal-container'></div>
                            </div>
                        ):
                        ( 
                            page===1?
                            <div className="DocEditing"></div>
                            :<div className="WhiteBoard"><Container image={image} socket={socket} flag={flag} setFlag={setFlag} ctx={ctx} setctx={setctx} timeout={timeout} settimeOut={settimeOut}/></div>
                        )
                    }
                </div>
            </div> 
            
            <div className='com-features-container'></div>
        </div>
    );
}
 
export default Meet;