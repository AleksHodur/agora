export const useSessionStorage = () => {

    const getProjects = () => {
        return sessionStorage.getItem('projects') != null ? JSON.parse(sessionStorage.getItem('projects')) : [];
    }

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
   
    return { addProject }
}