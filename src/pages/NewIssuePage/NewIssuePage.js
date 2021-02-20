import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import NewIssueForm from '../../components/form/NewIssueForm';
import useAuth from '../../hooks/useAuth';

function NewIssuePage(props) {
    const auth = useAuth();
    const [redirect, setRedirect] = useState(false);

    const addNewIssue = async (newIssue) => {
        await props.onSubmit(props.match.params.projectId, newIssue);
        setRedirect(true);
    }

    return (
        redirect === true ? 
            <Redirect to={`/projects/${props.match.params.projectId}/issues`} /> :
            <Container fluid className="page">
                <NewIssueForm onSubmit={addNewIssue}/>
            </Container>
    )
}

export default NewIssuePage;