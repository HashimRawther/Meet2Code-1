import React from 'react';
import './video-area.css';

export default function VideoArea(props) {
  return (
    <div className='video-area'>
    <button onClick={()=> props.setComm(0)} id='close-video-btn'>close</button>
    </div>
  )
}
