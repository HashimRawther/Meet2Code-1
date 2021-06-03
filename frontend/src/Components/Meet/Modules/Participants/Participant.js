import './participant.css';
const Participant = ({users}) => {
    console.log(users);
    return (  
        <div className='participantArea'>
            {users.map((user,id) => (
                  <div key={id} className="participant">
                    <p>{user.login}</p>
                  </div>
            ))}
        </div>
    );
}
 
export default Participant;