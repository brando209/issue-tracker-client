import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import NewIssueForm from '../../components/form/NewIssueForm';
import useAuth from '../../hooks/useAuth';
import issuesApi from '../../api/issues';

function NewIssuePage(props) {
    const auth = useAuth();
    const [redirect, setRedirect] = useState(false);

    const addNewIssue = async (newIssue) => {
        await issuesApi.createIssue(props.match.params.projectId, newIssue, auth.user.token);
        setRedirect(true);
    }

    return (
        redirect === true ? 
            <Redirect to={`/projects/${props.match.params.projectId}/issues`} /> :
            <NewIssueForm onSubmit={addNewIssue}/>
    )
}

export default NewIssuePage;