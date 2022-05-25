  import React from 'react'
import './code-area.css';
import Style from 'style-it';

export default function CodeArea(props) {
  return Style.it(`
    .code-area{
      background-color: ${props.theme[1]};
    }
  `,
    <div className='code-area'>
      
    </div>
  )
}
