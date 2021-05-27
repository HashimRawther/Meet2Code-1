import './participant.css';
const Participant = ({users}) => {
    return (  
        <div className='participantArea'>
            {users.map(({name}) => (
                  <div key={name} className="participant">
                    {name}
                  </div>
            ))}
        </div>
    );
}
 
export default Participant;