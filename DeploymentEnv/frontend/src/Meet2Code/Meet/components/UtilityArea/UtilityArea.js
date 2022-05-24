import React from 'react';
import './utility-area.css';
import Style from 'style-it';


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
            props.screenShare === 0 ? <img id='screen-icon' src='/icons/screen.png' alt='img'/> : <img id='screen-icon' src='/icons/stop-screen.png' alt='img'/>
          }
        </button>
        <button className='cam-btn' onClick={()=>{
          if(props.videoState === 1) 
            props.setVideoState(0);
          else 
            props.setVideoState(1);
        }}>
          {
            props.videoState === 1 ? <img id='cam-icon' src='/icons/video-camera.png' alt='img'/> : <img id='cam-icon' src='/icons/no-video.png' alt='img'/>
          }
        </button>
        <button className='mic-btn' onClick={()=>{
          if(props.audioState === 1) 
            props.setAudioState(0);
          else 
            props.setAudioState(1);
        }}>
          {
            props.audioState === 1 ? <img id='mic-icon' src='/icons/microphone.png' alt='img'/> : <img id='mic-icon' src='/icons/mute.png' alt='img'/>
          }
        </button>
        <button className='end-btn'>
          <img id='end-icon' src='/icons/phone-call-end.png' alt='img'/>
        </button>
        <button className='download-btn'>
          <img id='download-icon' src='/icons/download.png' alt='img'/>
        </button>
        <button className='clear-btn'>
          <img id='clear-icon' src='/icons/recycle.png' alt='img'/>
        </button>
        <button className='invite-btn'>
          <img id='invite-icon' src='/icons/invite.png' alt='img'/>
        </button>
      </div>
    </div>
  )
}
