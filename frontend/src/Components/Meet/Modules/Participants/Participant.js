import ScrollToBottom from 'react-scroll-to-bottom';
import './participant.css';
const Participant = ({users}) => {
    return (  
        <ScrollToBottom className='participantArea' behaviour='smooth'>
            {users.map((user,i)=><div key={i} className='participant'><p>{user}</p></div>)}
        </ScrollToBottom>
    );
}
 
export default Participant;