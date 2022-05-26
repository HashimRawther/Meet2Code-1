import React, { useEffect } from 'react';
import {renderer} from '../../../../Modules/VideoCall/vc';
import './vc.css';

export default function VC(props) {
    useEffect(()=>{
        if(props.myPeer !== undefined && props.myPeer !== null && props.socket!==undefined && props.socket !== null)
        {
            console.log('hi');
            renderer(props.socket,props.myPeer, props.room, props.name,props.tabs)
        }
    },[props.socket,props.myPeer, props.room, props.name,props.tabs]);
    return(<div id={props.tabs===0?'video-panel':'video-grid'}></div>);
}
