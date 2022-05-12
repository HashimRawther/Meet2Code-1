import React from 'react'
import './comm-switch.css';

import chatIcon from '../../Images/speech-bubble.png';
export default function CommSwitch(props) {
  return (
    <div className='comm-switch-box'>
      <img id='chat-icon' src={chatIcon} alt='img'/>
      <button onClick={()=>props.setComm(1)}>chat</button>
      <button onClick={()=>props.setComm(2)}>Participants</button>
      {
        props.tabs !==0?  (<button onClick={()=>props.setComm(3)}>video</button>) : (<button disabled={true} onClick={()=>props.setComm(3)}>video</button>) 
      }
    </div>
  )
}
