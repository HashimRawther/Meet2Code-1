import React,{useState,useEffect,useCallback} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import Quill from "quill"
import "quill/dist/quill.snow.css"
import Chat from './Modules/Chat/Chat/Chat';
import './styles.css';
import './Meet.css';
import Participant from './Modules/Participants/Participant';
import Container from './Modules/Whiteboard/container/Container';
import TextEditor from './Modules/DocEditor/TextEditor';
let socket;

const SAVE_INTERVAL_MS = 2000
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
]

const Meet = () => {
    const [page,setpage] = useState(0);
    const [com,setCom] = useState(0);
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
    const [messages,setMessages] = useState([]);
    const [message,setMessage] = useState('');
    const [usersInRoom,setUsersInRoom] = useState([]);
    const [ctx,setctx] = useState();
    const [timeout,settimeOut] = useState();
    const [image,setImage] = useState();
    const [quill, setQuill] = useState();

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
        return () =>{
            // socket.emit('disconnect');
            socket.off();
        }
    },[ENDPOINT]);
    useEffect(() => {
        if (socket == null || quill == null) return
    
        socket.once("load-document", document => {
          quill.setContents(document)
          quill.enable()
        })
    
        socket.emit("get-document",room)
    }, [quill, room])
    useEffect(() => {
        if (socket == null || quill == null) return
    
        const interval = setInterval(() => {
          socket.emit("save-document", quill.getContents())
        }, SAVE_INTERVAL_MS)
    
        return () => {
          clearInterval(interval)
        }
      }, [quill])
    useEffect(()=>{
        socket.on('message',(message)=>{
            setMessages([...messages,message]);
        })
        socket.on("roomData", ({ users }) => {
            setUsersInRoom(users);
        });
        socket.on("canvas-data",function(data){
            var image= new Image();
            image.onload=function(){
                if(ctx===undefined) return;
                ctx.drawImage(image,0,0);
            };
            image.src = data;
            setImage(image);
        })
        if (socket == null || quill == null) return

        const handler = delta => {
        quill.updateContents(delta)
        }
        socket.on("receive-changes", handler)
        return() => {
            socket.off("receive-changes", handler);
        }
    },[messages,ctx,quill]);
    useEffect(() => {
        if (socket == null || quill == null) return
    
        const handler = (delta, oldDelta, source) => {
          if (source !== "user") return
          socket.emit("send-changes", delta)
        }
        quill.on("text-change", handler)
    
        return () => {
          quill.off("text-change", handler)
        }
      }, [quill])
    const sendMessage=(e)=>{
        e.preventDefault();
        if(message){
            socket.emit('sendMessage',message,()=>{setMessage('')
        });
        }
    }
    const wrapperRef = useCallback(wrapper => {
        if (wrapper == null) return
    
        wrapper.innerHTML = ""
        const editor = document.createElement("div")
        wrapper.append(editor)
        const q = new Quill(editor, {
          theme: "snow",
          modules: { toolbar: TOOLBAR_OPTIONS },
        })
        q.disable()
        q.setText("Loading...")
        setQuill(q)
      }, [])
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
                            <div className="DocEditing"><TextEditor wrapperRef={wrapperRef}/></div>
                            :<div className="WhiteBoard"><Container image={image} socket={socket} ctx={ctx} setctx={setctx} timeout={timeout} settimeOut={settimeOut}/></div>
                        )
                    }
                </div>
            </div> 
            
            <div className='com-features-container'></div>
        </div>
    );
}
 
export default Meet;