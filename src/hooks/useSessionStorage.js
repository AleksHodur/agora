import { useCallback } from "react";

export const useSessionStorage = () => {

    const getProjects = () => {
        return sessionStorage.getItem('projects') != null ? JSON.parse(sessionStorage.getItem('projects')) : [];
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

        sessionStorage.setItem('projects', JSON.stringify(newProjects));
        //callSetProjects();
    }

    /* const addComment = (comment, projectName) => {
        const
        sessionStorage.setItem('projects', [...projects, project]);
        setProjects(sessionStorage.getItem('projects'));
    } */
   
    return { getProjectById, addProject }
}