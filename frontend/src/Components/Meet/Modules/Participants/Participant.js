import './participant.css';
const Participant = ({users}) => {
    return (  
        <div className='participantArea'>
            {users.map(({name}) => (
                  <div key={name} className="participant">
                    <p>{name}</p>
                  </div>
            ))}
        </div>
    );
}
 
export default Participant;