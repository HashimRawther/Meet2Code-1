import React from 'react'
import './communication-area.css';
import Style from 'style-it';

import ChatArea from './ChatArea/ChatArea';
import ParticipantArea from './ParticipantArea/ParticipantArea';
import VideoArea from './VideoArea/VideoArea';

import {sendMessage} from '../../Modules/Chat/Message';

export default function CommunicationArea(props) {
  return Style.it(`
  .communication-area{
    background-color: ${props.theme[1]};
  }
  .enlarge-btn{
    background: ${props.theme[4]};
  }
  .collapse-btn{
    background: ${props.theme[4]};
  }
  #left-arrow-icon{
    filter:${props.theme[5]};
  }
  #right-arrow-icon{
    filter:${props.theme[5]};
  }
`,
    <div className='communication-area'>
      {
        props.comm === 1 ?(<ChatArea {...props} sendMessage={sendMessage}/> ): props.comm ===2 ? (<ParticipantArea {...props}/>) : (<VideoArea {...props}/>)
      }
      <div className='expand-btn-area'>
        {
          props.tabs !== 0 ? (<button className='enlarge-btn' onClick={()=>{
            props.setPrevTab(props.tabs);
            props.setComm(1);
            props.setTabs(0);
          }}><img id='left-arrow-icon' src='/icons/left-arrow.png' alt='img'/></button>) : (<button className='collapse-btn' onClick={()=>props.setTabs(props.prevTab)}><img id='right-arrow-icon' src='/icons/right-arrow.png' alt='img'/></button>)
        }
      </div>
    </div>
  )
}
