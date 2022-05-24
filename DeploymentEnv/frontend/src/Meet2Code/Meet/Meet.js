import React, { useEffect, useState, useCallback } from 'react'
import './meet.css';
import Style from 'style-it';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import serverEndpoint from '../config';

import CommSwitch from './components/CommSwitch/CommSwitch';
import CommunicationArea from './components/CommunicationArea/CommunicationArea';
import MainArea from './components/MainArea/MainArea';
import TabArea from './components/TabArea/TabArea';
import TitleArea from './components/TitleArea/TitleArea';
import UtilityArea from './components/UtilityArea/UtilityArea';

import {chatSocketListeners,chatStopListeners} from './Modules/Chat/Message';

let socket;
const SAVE_INTERVAL_MS = 2000
export default function Meet(props) {
    const [comm,setComm] = useState(1);
    const [tabs,setTabs] = useState(1);
    const [view,setView] =useState(1);
    const [prevTab,setPrevTab] = useState(1);
    const [commTooltip,setCommTooltip] = useState(0);
    const [tabTooltip,setTabTooltip] = useState(0);
    const [screenShare,setScreenShare] = useState(0);
    const [videoState,setVideoState] = useState(0);
    const [audioState,setAudioState] = useState(0);

    
    const { id: roomID } = useParams()
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
    const [messages,setMessages] = useState([]);
    const [message,setMessage] = useState('');
    const [usersInRoom,setUsersInRoom] = useState([]);
    const [ctx,setctx] = useState();
    const [timeout,settimeOut] = useState();
    const [image,setImage] = useState();
    const [quill, setQuill] = useState();
    const [roomName,setRoomName] = useState();
    const [clear,setClear] = useState(0);
    const [save,setSave] = useState(0);
    // const [myPeer] = useState(PeerInit())
    const ENDPOINT = serverEndpoint;
    let   [question, setQuestion] = useState(undefined)
    let   [questionText, setQuestionText] = useState("")
    
    useEffect(()=>{
        const handleMouseEvent = (evt) => {
            const x = evt.clientX, y = evt.clientY;
            let l,w,t,h,Rect;
            let top = false,
            bottom = false,
            left = false,
            right = false;
            const titleBox = document.getElementById('title-space');
            const utilsBox = document.getElementById('utilities');
            const tabBox = document.getElementById('tab-switch');
            const commBox = document.getElementById('comm-switch');
            
            Rect = titleBox.getBoundingClientRect();
            l = Rect.left;
            w = l + Rect.width;
            t = Rect.top;
            h = t + Rect.height;
            if (x >= l && x <= w && y >= t && y <= h) top = true;
  
            Rect = utilsBox.getBoundingClientRect();
            l = Rect.left;
            w = l + Rect.width;
            t = Rect.top;
            h = t + Rect.height;
            if (x >= l && x <= w && y >= t && y <= h) bottom = true;

            Rect = tabBox.getBoundingClientRect();
            l = Rect.left;
            w = l + Rect.width;
            t = Rect.top;
            h = t + Rect.height;
            if (x >= l && x <= w && y >= t && y <= h) left=true;

            Rect = commBox.getBoundingClientRect();
            l = Rect.left;
            w = l + Rect.width;
            t = Rect.top;
            h = t + Rect.height;
            if (x >= l && x <= w && y >= t && y <= h) right=true;

            if(left || right || top || bottom) setView(1);
            else setView(0);  
        };
        document.addEventListener('mousemove',handleMouseEvent);

        return ()=>{
            document.removeEventListener('mousemove',handleMouseEvent);
        }
    },[]);


    useEffect(()=>{
        var connectionOptions =  {
            "force new connection" : true,
            "reconnectionAttempts": "Infinity", 
            "timeout" : 10000,                  
            "transports" : ["websocket"]
        };
        socket = io(ENDPOINT,connectionOptions);
        let name = props.user.login;
        setName(name)
        setRoom(roomID);
        let user = props.user;
        socket.emit('join',{roomID,user},(roomName)=>{
            setRoomName(roomName);
        });        
        return () =>{
            socket.off();
        }
    },[ENDPOINT,roomID,props.user]);
    
    useEffect(()=>{
        chatSocketListeners(socket,setMessages,messages);
        return(()=>{
            chatStopListeners(socket);
        })
    },[messages])
    

    
    return Style.it(`
        .meet-app{
            background-color:${props.theme[0]};
        }
    `,
        <div className='meet-app' view={view}>  
            <div id='title-space' className='title-space'>
                <TitleArea {...props} roomName={roomName} commTooltip={commTooltip} tabTooltip={tabTooltip} />
            </div>
            <div id='utilities' className='utilities'><UtilityArea {...props} screenShare={screenShare} setScreenShare={setScreenShare} videoState={videoState} setVideoState={setVideoState} audioState={audioState} setAudioState={setAudioState}/></div>
            <div id='tab-switch' className='tab-switch'><TabArea {...props} tabs={tabs} setTabTooltip={setTabTooltip} setTabs={setTabs}/></div>
            <div id='comm-switch' className='comm-switch'><CommSwitch {...props} setCommTooltip={setCommTooltip} tabs={tabs} setComm={setComm} comm={comm}/></div>
            {
                comm!==0? (<div id='app-container' className='App-container'><MainArea {...props} tabs={tabs} className="half-size"/> <CommunicationArea {...props} name={name} room={room} socket={socket} id={props.user._id} messages={messages} message={message} setMessage={setMessage} prevTab={prevTab} setPrevTab={setPrevTab} comm={comm} tabs={tabs} setComm={setComm} setTabs={setTabs}/></div>) : (<div id='app-container' className='App-container'><MainArea {...props} tabs={tabs} className="full-size"/></div>)
            }
        </div>
    )
}