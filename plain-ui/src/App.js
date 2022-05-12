import React, { useEffect, useState } from 'react'
import './app.css';
import CommSwitch from './components/CommSwitch/CommSwitch';
import CommunicationArea from './components/CommunicationArea/CommunicationArea';
import MainArea from './components/MainArea/MainArea';
import TabArea from './components/TabArea/TabArea';

export default function App() {
    const [comm,setComm] = useState(1);
    const [tabs,setTabs] = useState(1);
    const [view,setView] =useState(0);
    const [prevTab,setPrevTab] = useState(1);
    
    
    useEffect(()=>{
        const handleMouseEvent = (evt) => {
            const x = evt.clientX, y = evt.clientY;
            let l,w,t,h,Rect;
            let top = false,
            bottom = false,
            left = false,
            right = false;
            const titleBox = document.getElementById('title-space');
            const utilsBox = document.getElementById('utilities');
            const tabBox = document.getElementById('tab-switch');
            const commBox = document.getElementById('comm-switch');
            Rect = titleBox.getBoundingClientRect();
            l = Rect.left;
            w = l + Rect.width;
            t = Rect.top;
            h = t + Rect.height;
            if (x >= l && x <= w && y >= t && y <= h) top = true;

            Rect = utilsBox.getBoundingClientRect();
            l = Rect.left;
            w = l + Rect.width;
            t = Rect.top;
            h = t + Rect.height;
            if (x >= l && x <= w && y >= t && y <= h) bottom = true;

            Rect = tabBox.getBoundingClientRect();
            l = Rect.left;
            w = l + Rect.width;
            t = Rect.top;
            h = t + Rect.height;
            if (x >= l && x <= w && y >= t && y <= h) left=true;

            Rect = commBox.getBoundingClientRect();
            l = Rect.left;
            w = l + Rect.width;
            t = Rect.top;
            h = t + Rect.height;
            if (x >= l && x <= w && y >= t && y <= h) right=true;

            if(left | right | top | bottom) setView(1);
            else setView(0); 
        };
        document.addEventListener('mousemove',handleMouseEvent);

        return ()=>{
            document.removeEventListener('mousemove',handleMouseEvent);
        }
    },[])
    

    
    return (
        <div className='App' view={view}>  
            <div id='title-space' className='title-space'>
                <h1>Room Name</h1>
            </div>
            <div id='utilities' className='utilities'></div>
            <div id='tab-switch' className='tab-switch'><TabArea setTabs={setTabs}/></div>
            <div id='comm-switch' className='comm-switch'><CommSwitch tabs={tabs} setComm={setComm}/></div>
            {
                comm!==0? (<div id='app-container' className='App-container'><MainArea tabs={tabs} className="half-size"/> <CommunicationArea prevTab={prevTab} setPrevTab={setPrevTab} comm={comm} tabs={tabs} setComm={setComm} setTabs={setTabs}/></div>) : (<div id='app-container' className='App-container'><MainArea tabs={tabs} className="full-size"/></div>)
            }
        </div>
    )
}