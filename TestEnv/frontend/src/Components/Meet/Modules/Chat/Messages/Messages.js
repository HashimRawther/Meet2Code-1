import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import './messages.css';
import Message from '../Message/Message';
const Messages = ({id,messages}) => {
    return (  
        <ScrollToBottom className='messageArea' behaviour='smooth'>
            {messages.map((message,i)=><div key={i} className='msgspan'><Message Uid={id} message={message}/></div>)}
        </ScrollToBottom>
    );
}
export default Messages;