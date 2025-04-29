import Avatar from '../avatar/Avatar';
import './ProjectList.css';
import { Link } from 'react-router-dom';
import { firestoreDateToLocaleString, dateToLocaleString } from '../../helpers/converters';

function ProjectList({ projects }) {

    return ( 
        <div className='project-list'>
            {projects.length === 0 && <p>No projects yet!</p>}
            {projects.map((project) => (
                <Link to={`/project/${project.id}`} key={ project.id }>
                    <h4>{ project.name }</h4>
                    { !project.sessionProject && <p>Due by { firestoreDateToLocaleString(project.dueDate) }</p> }
                    { project.sessionProject && <p>Due by { dateToLocaleString(new Date(project.dueDate)) }</p> }
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