import React from 'react';
import './white-board-area.css';
import Style from 'style-it';
export default function WhiteBoardArea(props) {
  return Style.it(`
  .white-board-area{
    background-color: ${props.theme[1]};
  }
`,
    <div className='white-board-area'>
      
    </div>
  )
}
