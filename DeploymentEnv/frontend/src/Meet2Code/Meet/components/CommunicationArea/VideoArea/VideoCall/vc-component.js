import React, { useEffect } from 'react';
import VideoGrid from '../../../MainArea/VideoGrid/VideoGrid';
import './vc.css';

export default function VC(props) {
    useEffect(()=>{
        if(props.tabs === 0){
            const videoContainer = document.getElementById('video-container');
        }
    },[props.tabs])
    return(<div id={'video-container'}></div>);
}
