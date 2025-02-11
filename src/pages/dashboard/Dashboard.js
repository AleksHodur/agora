import './Dashboard.css';
import { useState } from 'react';
import { useCollection } from '../../hooks/useCollection';
import ProjectList from '../../components/projectList/ProjectList';
import ProjectFilter from '../../components/projectFilter/ProjectFilter';

function Dashboard () {
    const [currentFilter, setCurrentFilter] = useState('all');
    const { documents, error } = useCollection('projects');

    const changeFilter = (newFilter) => {
        setCurrentFilter(newFilter);
    }

    return ( 
        <div>
            <h2 className="page-title">Dashboard</h2>
            {error && <p className='error'>{ error }</p>}
            {documents && <ProjectFilter currentFilter={currentFilter}
            changeFilter={changeFilter}/>}
            {documents && <ProjectList projects={documents}/>}
        </div>
     );
}

export default Dashboard ;