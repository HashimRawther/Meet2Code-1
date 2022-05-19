import React, { useEffect, useState } from 'react'
import './app.css';
import Style from 'style-it';

import CommSwitch from './components/CommSwitch/CommSwitch';
import CommunicationArea from './components/CommunicationArea/CommunicationArea';
import MainArea from './components/MainArea/MainArea';
import TabArea from './components/TabArea/TabArea';
import TitleArea from './components/TitleArea/TitleArea';
import UtilityArea from './components/UtilityArea/UtilityArea';

export default function App() {
    const [comm,setComm] = useState(1);
    const [tabs,setTabs] = useState(1);
    const [view,setView] =useState(0);
    const [prevTab,setPrevTab] = useState(1);
    const [commTooltip,setCommTooltip] = useState(0);
    const [tabTooltip,setTabTooltip] = useState(0);
    const [screenShare,setScreenShare] = useState(0);
    const [videoState,setVideoState] = useState(0);
    const [audioState,setAudioState] = useState(0);

    //['background-color', 'window-color', 'icon-color','text-color','selected-item-color','black to icon-color filter']
    const colorPallete = [
        ['#000000','#222221','#A1A1A1','#D5D5D5','#666666','invert(72%) sepia(0%) saturate(108%) hue-rotate(183deg) brightness(93%) contrast(78%)'],
        ['#000205','#0E111A','#03050B','#BCF4EF','#199C95','invert(2%) sepia(8%) saturate(4372%) hue-rotate(188deg) brightness(103%) contrast(101%)'],
        ['#FFFFFF','#BBBBBB','#767676','#575758','#949494','invert(47%) sepia(1%) saturate(0%) hue-rotate(210deg) brightness(96%) contrast(84%)'],
        ['#EDC7B7','#EEE2DC','#AC3B61','#123C69','#BAB2B5','invert(27%) sepia(30%) saturate(2326%) hue-rotate(300deg) brightness(102%) contrast(87%)'],
        ['#EAE7DC','#D8C3A5','#E85A4F','#E98074','#8E8D8A','invert(47%) sepia(35%) saturate(1100%) hue-rotate(316deg) brightness(93%) contrast(94%)'],
        ['#FCE181','#FEF9E7','#0DEA05','#026670','#9FEDD7','invert(11%) sepia(84%) saturate(7074%) hue-rotate(240deg) brightness(87%) contrast(108%)']
    ]; 
    
    const [theme,setTheme] = useState(colorPallete[0]);
    
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
    

    
    return Style.it(`
        .App{
            background-color:${theme[0]};
        }
    `,
        <div className='App' view={view}>  
            <div id='title-space' className='title-space'>
                <TitleArea theme={theme} commTooltip={commTooltip} tabTooltip={tabTooltip} />
            </div>
            <div id='utilities' className='utilities'><UtilityArea theme={theme} screenShare={screenShare} setScreenShare={setScreenShare} videoState={videoState} setVideoState={setVideoState} audioState={audioState} setAudioState={setAudioState}/></div>
            <div id='tab-switch' className='tab-switch'><TabArea theme={theme} tabs={tabs} setTabTooltip={setTabTooltip} setTabs={setTabs}/></div>
            <div id='comm-switch' className='comm-switch'><CommSwitch theme={theme} setCommTooltip={setCommTooltip} tabs={tabs} setComm={setComm} comm={comm}/></div>
            {
                comm!==0? (<div id='app-container' className='App-container'><MainArea theme={theme} tabs={tabs} className="half-size"/> <CommunicationArea theme={theme} prevTab={prevTab} setPrevTab={setPrevTab} comm={comm} tabs={tabs} setComm={setComm} setTabs={setTabs}/></div>) : (<div id='app-container' className='App-container'><MainArea theme={theme} tabs={tabs} className="full-size"/></div>)
            }
        </div>
    )
}