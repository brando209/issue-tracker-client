import React from 'react';
import { Container } from 'react-bootstrap';

import useAuth from '../../../../hooks/useAuth';
import useResource from '../../../../hooks/useResource';

import IssueNavBar from '../../Navigation/IssueNavBar';
import IssueList from '../pageComponents/IssueList/IssueList';

import issuesApi  from '../../../../api/issues';

function IssueDashboard(props) {
    const auth = useAuth();
    const issues = useResource(`http://localhost:3001/api/projects/${props.match.params.projectId}/issues`, auth.user ? auth.user.token : null);

    const deleteIssue = async (projectId, issueId) => {
        await issuesApi.deleteIssue(projectId, issueId, auth.user.token);
    }

    return (
        <Container fluid>
            <IssueNavBar />
            <IssueList projectId={props.match.params.projectId} issueList={issues.data} onDelete={deleteIssue}/>
        </Container>
    )
}

export default IssueDashboard;