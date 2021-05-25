import React from 'react';
import './chat.css';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
const Chat = ({messages,name,message,setMessage,sendMessage}) => {
    return ( 
            <div className='chat'>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
    );
}
 
export default Chat;