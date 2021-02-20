import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import useAuth from '../../hooks/useAuth';
import NewProjectForm from '../../components/form/NewProjectForm';

function NewProjectPage(props) {
    const auth = useAuth();
    const [redirect, setRedirect] = useState(false);

    const createNewProject = async (newProject) => {
        console.log("Creating project with token " + auth.user.token);
        await props.onSubmit(newProject);
        setRedirect(true);
    }

    return (
        redirect === true ? 
        <Redirect to="/projects"/> :
        <Container fluid className="page">
            <NewProjectForm onSubmit={createNewProject} />
        </Container>
    )
}

export default NewProjectPage;