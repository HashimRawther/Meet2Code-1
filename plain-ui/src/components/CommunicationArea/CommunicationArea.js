import React from 'react'
import './communication-area.css';
import ChatArea from './ChatArea/ChatArea';
import ParticipantArea from './ParticipantArea/ParticipantArea';
import VideoArea from './VideoArea/VideoArea';

export default function CommunicationArea(props) {
  let b1 ='<';
  let b2='>';
  return (
    <div className='communication-area'>
      {
        props.comm === 1 ?(<ChatArea {...props}/> ): props.comm ===2 ? (<ParticipantArea {...props}/>) : (<VideoArea {...props}/>)
      }
      <div className='expand-btn-area'>
        {
          props.tabs !== 0 ? (<button onClick={()=>{
            props.setPrevTab(props.tabs);
            props.setComm(1);
            props.setTabs(0);
          }}>{b1}</button>) : (<button onClick={()=>props.setTabs(props.prevTab)}>{b2}</button>)
        }
      </div>
    </div>
  )
}
