import React from 'react'
import './question.css';
import { useEffect } from 'react';
import Style from 'style-it';
// import { MathComponent } from 'mathjax-react';

export default function Question(props) {

  useEffect(()=>{

    let question = document.getElementsByClassName('question-container');
    if(question.length > 0)
    { 
      question = question[0]
      question.innerHTML = props.questionText
    }

  },[props.questionText]);

  return Style.it(`
    .question-container{
      color:${props.theme[3]};
      background-color:${props.theme[2]};
    }
  `,
    <div className='question-container'>
        {/* {props.questionText !== "" ?
            <MathComponent tex={props.questionText}/> :
            ""
        } */}
    </div>
  )
}
