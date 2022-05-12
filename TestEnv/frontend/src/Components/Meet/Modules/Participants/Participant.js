import './participant.css';
import React, {useEffect,useState} from 'react';
import {CSVLink, CSVDownload} from 'react-csv';
const Participant = ({users}) => {
    const data = [];
    const headers = [
        {label: "Name", key:"name"}
    ];
    let [csvReport,setCsvReport] = useState({data:data,headers:headers,filename:'Attendence.csv'});
    useEffect(()=>{
        users.forEach(user => data.push({name: user.login}));
        setCsvReport({
            data: data,
            headers: headers,
            filename: 'Attendence.csv'
        });
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
                <CSVLink {...csvReport} className='click-link'>Download Attendence</CSVLink>
            </div>
        </div>
    );
}
 
export default Participant;