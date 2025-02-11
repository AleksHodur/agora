import Avatar from '../avatar/Avatar';
import './ProjectSummary.css'
import { firestoreDateToLocaleString } from '../../helpers/converters';
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useHistory } from 'react-router-dom';

function ProjectSummary({ project }) {
    const { deleteDocument } = useFirestore('projects');
    const { user } = useAuthContext();
    const history = useHistory();

    const handleClick = (e) => {
        deleteDocument(project.id);
        history.push('/');
    }

    console.log(project);

    return ( 
        <div>
            <div className="project-summary">
                <h2 className="page-title">{ project.name }</h2>
                <p>By { project.createdBy.displayName }</p>
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
            { user.uid === project.createdBy.id && (
                <button className="btn" onClick={ handleClick }>Mark as Complete</button>
            )}
        </div>
     );
}

export default ProjectSummary;