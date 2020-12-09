import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import projectsApi from '../../api/projects'; 
import NewProjectForm from '../../components/form/NewProjectForm';

function NewProjectPage() {
    const auth = useAuth();
    const [redirect, setRedirect] = useState(false)

    const createNewProject = async (newProject) => {
        console.log("Creating project with token " + auth.user.token);
        const project = await projectsApi.createProject(newProject, auth.user.token);
        setRedirect(true);
        console.log(project);
    }

    return (
        redirect === true ? 
        <Redirect to="/projects"/> :
        <NewProjectForm onSubmit={createNewProject} />
    )
}

export default NewProjectPage;