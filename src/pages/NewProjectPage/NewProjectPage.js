import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import projectsApi from '../../api/projects'; 
import NewProjectForm from '../../components/form/NewProjectForm';

function NewProjectPage(props) {
    const auth = useAuth();
    const [redirect, setRedirect] = useState(false);

    const createNewProject = async (newProject) => {
        console.log("Creating project with token " + auth.user.token);
        props.onSubmit(newProject);
        setRedirect(true);
    }

    return (
        redirect === true ? 
        <Redirect to="/projects"/> :
        <NewProjectForm onSubmit={createNewProject} />
    )
}

export default NewProjectPage;