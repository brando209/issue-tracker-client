import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import NewIssueForm from '../../components/form/NewIssueForm';
import useResource from '../../hooks/useResource';
import useAuth from '../../hooks/useAuth';

function NewIssuePage(props) {
    const auth = useAuth();
    const [collaborators, setCollaborators] = useResource(
        `http://localhost:3001/api/projects/${props.match.params.projectId}/collaborators`,
        auth.user ? auth.user.token : null
    );
    const [redirect, setRedirect] = useState(false);

    const addNewIssue = async (newIssue) => {
        await props.onSubmit(props.match.params.projectId, newIssue);
        setRedirect(true);
    }

    return (
        redirect === true ? 
            <Redirect to={`/projects/${props.match.params.projectId}/issues`} /> :
            <Container fluid className="page">
                <NewIssueForm onSubmit={addNewIssue} collaborators={collaborators.data}/>
            </Container>
    )
}

export default NewIssuePage;