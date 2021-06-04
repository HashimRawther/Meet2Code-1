import './participant.css';
const Participant = ({users}) => {
    return (  
        <div className='participantArea'>
            {users.map((user,id) => (
                  <div key={id} className="participant">
                    <img src={user.imageUrl} alt=""/>
                    <p>{user.login}</p>
                  </div>
            ))}
        </div>
    );
}
 
export default Participant;