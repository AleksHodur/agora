import { useAuthContext } from '../../hooks/useAuthContext';

import './Navbar.css';
import Parthenon from '../../assets/parthenon.svg';

function Navbar () {
    const { user } = useAuthContext();

    return ( 
        <div className='navbar'>
            <ul>
                <li className="logo">
                    <img src={Parthenon} alt="agora logo" />
                    <span>Agora</span>
                </li>

                <button className="btn" >Logout</button>
            </ul>
        </div>
     );
}

export default Navbar;