import React from 'react';
import './utility-area.css';
import Style from 'style-it';

import endCallIcon from '../../Images/phone-call-end.png';
import camOnIcon from '../../Images/video-camera.png';
import camOffIcon from '../../Images/no-video.png';
import micOnIcon from '../../Images/microphone.png';
import micOffIcon from '../../Images/mute.png'; 
import downloadIcon from '../../Images/download.png';
import clearIcon from '../../Images/recycle.png';
import inviteIcon from '../../Images/invite.png';
import screenShareIcon from '../../Images/screen.png';
import stopShareIcon from '../../Images/stop-screen.png';



export default function UtilityArea(props) {
  return Style.it(`
    .utility-panel{
      background-color:${props.theme[1]};
    }
    .screen-btn:hover{
      background-color:${props.theme[4]};
    }
    .cam-btn:hover{
      background-color:${props.theme[4]};
    }
    .mic-btn:hover{
      background-color: ${props.theme[4]};
    }
    .end-btn:hover{
      background-color: ${props.theme[4]};
    }
    .download-btn:hover{
      background-color: ${props.theme[4]};
    }
    .clear-btn:hover{
      background-color: ${props.theme[4]};
    }
    .invite-btn:hover{
      background-color: ${props.theme[4]};
    }
    #screen-icon{
      filter:${props.theme[5]};
    }
    #cam-icon{
      filter:${props.theme[5]};
    }
    #mic-icon{
      filter:${props.theme[5]};
    }
    #download-icon{
      filter:${props.theme[5]};
    }
    #clear-icon{
      filter:${props.theme[5]};
    }
    #invite-icon{
      filter:${props.theme[5]};
    }
  `,
    <div className='utility-area'>
      <div className='utility-panel'>
        <button className='screen-btn' onClick={()=>{
          if(props.screenShare === 1) 
            props.setScreenShare(0);
          else 
            props.setScreenShare(1);
        }}>
          {
            props.screenShare === 0 ? <img id='screen-icon' src={screenShareIcon} alt='img'/> : <img id='screen-icon' src={stopShareIcon} alt='img'/>
          }
        </button>
        <button className='cam-btn' onClick={()=>{
          if(props.videoState === 1) 
            props.setVideoState(0);
          else 
            props.setVideoState(1);
        }}>
          {
            props.videoState === 1 ? <img id='cam-icon' src={camOnIcon} alt='img'/> : <img id='cam-icon' src={camOffIcon} alt='img'/>
          }
        </button>
        <button className='mic-btn' onClick={()=>{
          if(props.audioState === 1) 
            props.setAudioState(0);
          else 
            props.setAudioState(1);
        }}>
          {
            props.audioState === 1 ? <img id='mic-icon' src={micOnIcon} alt='img'/> : <img id='mic-icon' src={micOffIcon} alt='img'/>
          }
        </button>
        <button className='end-btn'>
          <img id='end-icon' src={endCallIcon} alt='img'/>
        </button>
        <button className='download-btn'>
          <img id='download-icon' src={downloadIcon} alt='img'/>
        </button>
        <button className='clear-btn'>
          <img id='clear-icon' src={clearIcon} alt='img'/>
        </button>
        <button className='invite-btn'>
          <img id='invite-icon' src={inviteIcon} alt='img'/>
        </button>
      </div>
    </div>
  )
}
