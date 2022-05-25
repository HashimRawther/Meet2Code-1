import React, { useEffect } from 'react';
import {renderer} from '../../../../Modules/VideoCall/vc';
import './vc.css';

export default function VC(props) {
    useEffect(()=>{
        if(props.myPeer !== undefined && props.myPeer !== null && props.socket!==undefined && props.socket !== null)
        {
            console.log('hi');
            renderer(props.socket,props.myPeer, props.room, props.name)
        }
    },[props.socket,props.myPeer, props.room, props.name]);
    return(<div id='video-grid'></div>);
}
