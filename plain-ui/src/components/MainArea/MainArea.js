import React from 'react'
import CodeArea from './CodeArea/CodeArea';
import DocsArea from './DocsArea/DocsArea';
import './main-area.css';
import ScreenShareArea from './ScreenShareArea/ScreenShareArea';
import VideoGrid from './VideoGrid/VideoGrid';
import WhiteBoardArea from './WhiteBoardArea/WhiteBoardArea';
export default function MainArea(props) {
  return (
    <div className={`main-area ${props.className}`}>
      {
        props.tabs === 1 ? (<CodeArea/>) : props.tabs === 2 ? (<DocsArea/>) : props.tabs === 3 ? (<WhiteBoardArea/>) : props.tabs === 4 ? (<ScreenShareArea/>) : (<VideoGrid/>) 
      }
    </div>
  )
}
