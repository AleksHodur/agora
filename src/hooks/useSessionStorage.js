import { useCallback } from "react";

export const useSessionStorage = () => {

    const getProjects = () => {
        return sessionStorage.getItem('projects') != null ? JSON.parse(sessionStorage.getItem('projects')) : [];
    }

    const setProjects = (newProjects) => {
        sessionStorage.setItem('projects', JSON.stringify(newProjects));
    }

    const getProjectById = useCallback((id) => {
        let sessionProjects = getProjects();
        let projectArray = sessionProjects.filter(project => project.id == id);

        if(projectArray && projectArray.length > 0) {
            return projectArray[0];
        } else {
            return null;
        }
    }, []);

    const addProject = (project) => {
        const projects = getProjects();
        const newProjects = [...projects, project];

        setProjects(newProjects);
    }

    const deleteProject = (id) => {
        const projects = getProjects();
        const newProjects = projects.filter(project => project.id != id);

        setProjects(newProjects);

    }

    const addComment = (projectId, comment) => {
        let projects = getProjects();
        let project = getProjectById(projectId);

        if(project.comments) {
            project.comments.push(comment);
        } else {
            project.comments = [ comment ];
        }

        const index = projects.findIndex(p => p.id === projectId);

        if (index !== -1) {
            projects[index] = project;
            setProjects(projects);
        } else {
            console.warn('Could not find the project in session storage');
        }
    }
   
    return { getProjectById, addProject, deleteProject, addComment }
}