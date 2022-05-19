import React from 'react';
import './docs-area.css';
import Style from 'style-it';
export default function DocsArea(props) {
  return Style.it(`
  .docs-area{
    background-color: ${props.theme[1]};
  }
`,
    <div className='docs-area'>
      
    </div>
  )
}
