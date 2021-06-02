import './participant.css';
const Participant = ({users}) => {
    return (  
        <div className='participantArea'>
            {users.map((user) => (
                  <div key={user._id} className="participant">
                    <p>{user.login}</p>
                  </div>
            ))}
        </div>
    );
}
 
export default Participant;