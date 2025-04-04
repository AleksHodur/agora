import { NavLink } from 'react-router-dom';

import './Sidebar.css';
import DashboardIcon from '../../assets/dashboard_icon.svg';
import AddIcon from '../../assets/add_icon.svg';
import { useAuthContext } from '../../hooks/useAuthContext';
import Avatar from '../avatar/Avatar';

function Sidebar() {
    const { user } = useAuthContext();

    return ( 
        <div className='sidebar'>
            <div className="sidebar-content">
                <div className="user">
                    {user.photoURL && <Avatar src={ user.photoURL } size='80px'/>}
                    <p>Hey, { user.displayName }!</p>
                </div>

                <nav className="links">
                    <ul>
                        <li>
                            <NavLink exact to='/'>
                                <img src={ DashboardIcon } alt="dashboard icon" />
                                <span>Dashboard</span>
                            </NavLink>

                            <NavLink to='/create'>
                                <img src={ AddIcon } alt="add icon" />
                                <span>New Project</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
     );
}

export default Sidebar;