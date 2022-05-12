import React from 'react';
import './tab-area.css';

export default function TabArea(props) {
  return (
    <div className='tab-area'>
      <button onClick={()=>props.setTabs(1)}>Code</button>
      <button onClick={()=>props.setTabs(2)}>Docs</button>
      <button onClick={()=>props.setTabs(3)}>Paint</button>
      <button onClick={()=>props.setTabs(4)}>scrSh</button>
    </div>
  )
}
