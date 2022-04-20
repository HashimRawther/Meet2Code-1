import './participant.css';
import React, {useEffect} from 'react';
import {CSVLink} from 'react-csv';
const Participant = ({users}) => {
    const data = [];
    let csvReport;
    let csvLinkEl = React.createRef;
    const headers = [
        {label: "Name", key:"name"}
    ];
    useEffect(()=>{
        users.forEach(user => data.push({name: user.login}));
        csvReport = {
            data: data,
            headers: headers,
            filename: 'Attendence.csv'
        }
    },[])
    return (  
        <div className='participantContainer'>
            <div className='participantArea'>
                {users.map((user,id) => (
                    <div key={id} className="participant">
                        <img src={user.imageUrl} alt=""/>
                        <p>{user.login}</p>
                    </div>
                ))}
            </div>
            <div>
                {/* <button className="click-button">Export Attendence</button> */}
                <csvlink {...csvReport}> Export Attendance</csvlink>
            </div>
        </div>
    );
}
 
export default Participant;