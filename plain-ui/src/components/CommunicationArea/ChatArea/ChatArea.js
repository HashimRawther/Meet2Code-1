import React from 'react'
import './chat-area.css';

export default function ChatArea(props) {
  return (
    <div className='chat-area'>
      <button onClick={()=> props.setComm(0)} id='close-chat-btn'>close</button>
    </div>
  )
}
