import './OnlineUsers.css';
import { useCollection } from '../../hooks/useCollection';
import { AuthContext } from '../../context/AuthContext';
import Avatar from '../avatar/Avatar';
import { useContext } from 'react';

function OnlineUsers() {
    const { error, documents } = useCollection('users');
    const { user } = useContext(AuthContext);
    let localDocuments;
    
    if(documents) {
        localDocuments = [ ...documents, user ];
    }

    return ( 
        <div className="user-list">
            <h2>All Users</h2>
            { error && <div className='error'>{ error }</div>}
            { localDocuments && localDocuments.map(user => (
                <div key={user.id} className='user-list-item'>
                    { user.online && <span className='online-user'></span>}
                    <span>{ user.displayName }</span>
                    <Avatar src={user.imgURL} size='50px'/>
                </div>
            ))}
        </div>
     );
}

export default OnlineUsers;