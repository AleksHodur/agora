import Avatar from '../avatar/Avatar';
import './ProjectList.css';
import { Link } from 'react-router-dom';
import { timestamp } from '../../firebase/config';

function ProjectList({ projects}) {
    const convertDate = (date) => {
        const dateJS = date.toDate();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        return dateJS.toLocaleDateString('en-GB', options);
    }

    return ( 
        <div className='project-list'>
            {projects.length === 0 && <p>No projects yet!</p>}
            {projects.map((project) => (
                <Link to={`/project/${project.id}`} key={ project.id }>
                    <h4>{ project.name }</h4>
                    <p>Due by { convertDate(project.dueDate) }</p>
                    <div className="assigned-to">
                        <ul>
                            {project.assignedUsersList.map(user => (
                                <li key={user.photoURL}>
                                    <Avatar src={user.photoURL} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </Link>
            ))}
        </div>
     );
}

export default ProjectList;