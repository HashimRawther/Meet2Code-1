import Peer from 'peerjs'
import {peerEndPoint, peerPath, peerPort} from '../../../config';
function CreatePeer()
{
    // const myPeer = new Peer({host:'codebois-peer-server.herokuapp.com', secure:true, port:443})
    
    const myPeer = new Peer({host:peerEndPoint, port:peerPort, path:peerPath});
    return myPeer
}

export {CreatePeer}