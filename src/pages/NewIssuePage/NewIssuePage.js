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

    const addIssueAttachment = async (issueId, attachmentData, cb) => {
        console.log("in new issue page")
        return props.onCreateAttachmentRequest(props.match.params.projectId, issueId, attachmentData, cb);
    }

    const addNewIssue = async (newIssue, cb) => {
        const attachments = newIssue.attachments;
        delete newIssue.attachments;

        let callbacks = cb(null);
        const issue = await props.onSubmit(props.match.params.projectId, newIssue);
        const promises = [];
        attachments && attachments.forEach(file => {
            callbacks = cb(file);
            const data = new FormData();
            data.append('attachments', file);
            promises.push(addIssueAttachment(issue.id, data, callbacks.progressCb));
        })

        const attachmentHandles = await Promise.all(promises)
            .then(responses => responses.map(response => response.data.id))
            .then(data => {
                callbacks.successCb();
                return data;
            })
            .catch(err => callbacks.failureCb(err));

        props.onAddAttachment(props.match.params.projectId, issue.id, attachmentHandles);

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