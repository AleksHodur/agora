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

    const getFirestoreComments = () => {
        return sessionStorage.getItem('firestoreComments') != null ? JSON.parse(sessionStorage.getItem('firestoreComments')) : [];
    }

    const setFirestoreComments = (newComments) => {
        sessionStorage.setItem('firestoreComments', JSON.stringify(newComments));
    }

    const getFirestoreCommentsByProjectId = (id) => {
        let sessionProjects = getFirestoreComments();
        let projectComments = sessionProjects.filter(obj => obj.projectId == id);

        if(projectComments && projectComments.length > 0) {
            return projectComments[0];
        } else {
            return null;
        }
    }

    const addFirestoreComment = (projectId, comment) => {
        let projectComments = getFirestoreCommentsByProjectId(projectId);
        let firestoreComments = getFirestoreComments();

        if(!projectComments || projectComments === null) {
            projectComments = {
                projectId: projectId,
                comments: []
            }
        }

        projectComments.comments.push(comment);
        //sessionStorage.setItem('firestoreComments', JSON.stringify([...firestoreComments, projectComments]));
        deleteFirestoreComments(projectId);
        firestoreComments = getFirestoreComments();
        setFirestoreComments([...firestoreComments, projectComments]);

    }

    const deleteFirestoreComments = (projectId) => {
        const firestoreComments = getFirestoreComments();
        const newProjects = firestoreComments.filter(project => project.projectId != projectId);

        setFirestoreComments(newProjects);
    }
   
    return { getProjectById,
             addProject,
             deleteProject,
             addComment,
             getFirestoreCommentsByProjectId,
             addFirestoreComment
            }
}