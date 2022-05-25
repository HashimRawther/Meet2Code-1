import React from 'react'
import './question.css'

export default function Question(props) {
  return (
    <div className='question-container'>
        {props.questionText !== "" ?
            <div>
                {props.questionText}
            </div> :
            ""
        }
    </div>
  )
}
