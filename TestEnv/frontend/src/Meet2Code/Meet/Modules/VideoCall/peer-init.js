import Peer from 'peerjs'

function CreatePeer()
{
    const myPeer = new Peer({host:'codebois-peer-server.herokuapp.com', secure:true, port:443})
    
    // const myPeer = new Peer({host:'localhost', port:5000, path:'/myapp'})
    return myPeer
}

export {CreatePeer}