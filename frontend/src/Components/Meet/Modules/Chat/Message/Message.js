import React from 'react';
import './message.css';
const Message = ({Uid,message:{id,user,text}}) => {
    let isSentByCurrentUser = false;
    if(id === Uid)
    {
        isSentByCurrentUser = true;
    }
    return (  
        isSentByCurrentUser
        ?(
            <div className='message justifyEnd'>
                <p className='senttext pr'>You</p>
                <div className="messageBox backgroundBlue">
                    <p className='msgtext'>{text}</p>
                </div>
            </div>
        )
        :(
            <div className='message'>
                <div className="messageBox">
                    <p className='msgtext'>{text}</p>
                </div>
                <p className='senttext'>{user}</p>
            </div>
        )
    );
}
 
export default Message;