import './Project.css';
import { useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';
import ProjectSummary from '../../components/projectSummary/ProjectSummary';

function Project () {
    const { id } = useParams();
    const { error, document } = useDocument('projects', id);

    if (error) {
        return <div className='error'>{ error }</div>
    }

    if (!document) {
        return <div className='loading'>Loading...</div>
    }

    return ( 
        <div className='project-details'>
            <h1>{ document.name }</h1>
            <ProjectSummary project={ document } />
        </div>
     );
}

export default Project ;