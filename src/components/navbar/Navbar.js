import { Link } from 'react-router-dom';

import './Navbar.css';
import Temple from '../../assets/temple.svg';

function Navbar () {
    return ( 
        <div className='navbar'>
            <ul>
                <li className="logo">
                    <img src={Temple} alt="agora logo" />
                    <span>Agora</span>
                </li>

                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Signup</Link></li>

                <button className="btn">Logout</button>
            </ul>
        </div>
     );
}

export default Navbar;