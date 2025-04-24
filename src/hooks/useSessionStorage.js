import { useState } from 'react';

let initialState = sessionStorage.getItem('projects') != null ? JSON.parse(sessionStorage.getItem('projects')) : [];

export const useSessionStorage = () => {
    const [projects, setProjects] = useState(initialState);

    const callSetProjects = () => {
        setProjects(JSON.parse(sessionStorage.getItem('projects')));
    }

    const addProject = (project) => {
        const newProjects = [...projects, project];

        sessionStorage.setItem('projects', JSON.stringify(newProjects));
        callSetProjects();
    }

    /* const addComment = (comment, projectName) => {
        const
        sessionStorage.setItem('projects', [...projects, project]);
        setProjects(sessionStorage.getItem('projects'));
    } */
   
    return { addProject }
}