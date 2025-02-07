import './ProjectList.css';
import { useCollection } from '../../hooks/useCollection';

function ProjectList({ projects}) {

    return ( 
        <div>
            {projects.length === 0 && <p>No projects yet!</p>}
            {projects.map((project) => (
                <div key={project.id} className="">
                    { project.name }
                </div>
            ))}
        </div>
     );
}

export default ProjectList;