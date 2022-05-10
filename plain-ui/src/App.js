import React, { useEffect, useState } from 'react'
import './app.css';
import CommSwitch from './components/CommSwitch/CommSwitch';
import CommunicationArea from './components/CommunicationArea/CommunicationArea';
import MainArea from './components/MainArea/MainArea';
import {AppContainerDefault,AppContainerHover} from './styles/AppStyle';

export default function App() {
    const [comm,setComm] = useState(1);
    const [appCompStyle,setAppCompStyle] =useState(AppContainerDefault);
    useEffect(()=>{
        console.log(appCompStyle);
    },[appCompStyle]);
    const handleMouseEvent = (evt) => {
        console.log(evt);
        // const title_space = document.getElementById('title-space');
        // console.log(title_space);
        // title_space.focus();
        const inp = document.getElementById('title-space');
        inp.focus();
        console.log(document.activeElement);
        setAppCompStyle(AppContainerHover);
        console.log(appCompStyle);
    };

    
    document.addEventListener('click',handleMouseEvent);
    return (
        <div className='App'>  
            <div id='title-space' className='title-space'><input id='inp'/></div>
            <div className='utilities'></div>
            <div className='tab-switch'></div>
            <div className='comm-switch'><CommSwitch/></div>
            {
                comm!==0? (<div style={appCompStyle}><MainArea className="half-size"/> <CommunicationArea comm={comm} setComm={setComm}/></div>) : (<div className='App-container'><MainArea className="full-size"/></div>)
            }
        </div>
    )
}