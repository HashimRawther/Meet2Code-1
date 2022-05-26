
import React from 'react';

import '../Meet/components/MainArea/CodeArea/code-area.css';
import Style from 'style-it';
import CodeEditor from './ContestCodeEditor';
import Question from './ContestQuestion';
import Terminal from '../Meet/components/MainArea/CodeArea/Terminal/Terminal';


export default function CodeArea(props) {

  return Style.it(`
    .code-area{
      background-color: ${props.theme[1]};
    }

    .editorProperties{
        background-color : ${props.theme[0]}
    }

    .tabOptionDisplay{
        cursor : pointer;
    }
  `,
    <div className='code-area'>
      <CodeEditor {...props}/>
      <Question {...props}/>
      <Terminal {...props}/>
    </div>
  )
}
