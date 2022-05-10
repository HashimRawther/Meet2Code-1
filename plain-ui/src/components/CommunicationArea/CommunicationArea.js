import React from 'react'
import './communication-area.css';
import ChatArea from './ChatArea/ChatArea';
export default function CommunicationArea(props) {
  return (
    <div className='communication-area'>
      <button onClick={()=>{
          console.log('closed');
          props.setComm(0);
        }}>close</button>
      <ChatArea/>
    </div>
  )
}
