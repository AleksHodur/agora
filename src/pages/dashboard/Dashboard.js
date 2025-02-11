import './Dashboard.css';
import { useState } from 'react';
import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';
import ProjectList from '../../components/projectList/ProjectList';
import ProjectFilter from '../../components/projectFilter/ProjectFilter';

function Dashboard () {
    const [currentFilter, setCurrentFilter] = useState('all');
    const { documents, error } = useCollection('projects');
    const { user } = useAuthContext();

    const projects = documents ? documents.filter((document) => {
        switch (currentFilter) {
            case 'all':
                return true;

            case 'by me':
                return user.uid === document.createdBy.id;

            case 'mine':
                //some() returns true the first match it finds, more useful than forEach!
                return document.assignedUsersList.some((u) => u.id === user.uid);

            case 'development':
            case 'design':
            case 'marketing':
            case 'sales':
                return currentFilter === document.category;

            default:
                return false;
        }
    }) : null;

    const changeFilter = (newFilter) => {
        setCurrentFilter(newFilter);
    }

    return ( 
        <div>
            <h2 className="page-title">Dashboard</h2>
            {error && <p className='error'>{ error }</p>}
            {projects && <ProjectFilter currentFilter={currentFilter}
            changeFilter={changeFilter}/>}
            {projects && <ProjectList projects={projects}/>}
        </div>
     );
}

export default Dashboard ;