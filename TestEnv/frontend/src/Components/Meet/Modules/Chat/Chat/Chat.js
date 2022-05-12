import React from 'react';
import './chat.css';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
const Chat = ({id,messages,message,setMessage,sendMessage}) => {
    return ( 
            <div className='chat'>
                <Messages id={id} messages={messages}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
    );
}
 
export default Chat;