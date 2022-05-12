import React from 'react';
import './participant-area.css';

export default function ParticipantArea(props) {
  return (
    <div className='participant-area'>
      <button onClick={()=> props.setComm(0)} id='close-participant-btn'>close</button>
    </div>
  )
}
