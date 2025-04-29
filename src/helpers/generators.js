export const generateId = () => {
    let projects = JSON.parse(sessionStorage.getItem('projects'));

    if(projects && projects.length > 0) {
        let lastId = projects.pop().id;
        let newId = ++lastId;
        return newId;
    } else {
        return 1;
    }
}