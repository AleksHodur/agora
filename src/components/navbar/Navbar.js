import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext';

import './Navbar.css';
import Parthenon from '../../assets/parthenon.svg';

function Navbar () {
    const { logout, isPending } = useLogout();
    const { user } = useAuthContext();

    return ( 
        <div className='navbar'>
            <ul>
                <li className="logo">
                    <img src={Parthenon} alt="agora logo" />
                    <span>Agora</span>
                </li>

                {user == null && 
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </>
                }
                {(user != null && !isPending) && <button className="btn" onClick={logout}>Logout</button>}

                {(user != null && isPending) && <button className="btn" disabled>Logging out...</button>}
            </ul>
        </div>
     );
}

export default Navbar;