import Avatar from '../avatar/Avatar';
import './ProjectSummary.css'
import { firestoreDateToLocaleString } from '../../helpers/converters';

function ProjectSummary({ project }) {

    return ( 
        <div>
            <div className="project-summary">
                <h2 className="page-title">{ project.name }</h2>
                <p className="due-date">
                    Project due by { firestoreDateToLocaleString(project.dueDate) }
                </p>
                <p className="details">
                    { project.details }
                </p>
                <h4>Project is assigned to:</h4>
                <div className="assigned-users">
                    { project.assignedUsersList.map(user => (
                        <div key={ user.id }>
                            <Avatar src={ user.photoURL }/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
     );
}

export default ProjectSummary;