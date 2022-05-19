import React from 'react';
import './screen-share-area.css';
import Style from 'style-it';
export default function ScreenShareArea(props) {
  return Style.it(`
  .screen-share-area{
    background-color: ${props.theme[1]};
  }
`,
    <div className='screen-share-area'>
      
    </div>
  )
}
