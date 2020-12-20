import React from 'react';
import { Container } from 'react-bootstrap';

import useAuth from '../../hooks/useAuth';
import useResource from '../../hooks/useResource';

import IssueNavBar from '../../components/app/Navigation/IssueNavBar';
import IssueList from '../../components/app/IssueList/IssueList';

import issuesApi  from '../../api/issues';
import useDialogBox from '../../hooks/useDialogBox';
import SelectForm from '../../components/form/SelectForm';

function IssueDashboard(props) {
    const auth = useAuth();
    const issues = useResource(
        `http://localhost:3001/api/projects/${props.match.params.projectId}/issues`,
        auth.user ? auth.user.token : null
    );
    const collaborators = useResource(
        `http://localhost:3001/api/projects/${props.match.params.projectId}/collaborators`,
        auth.user ? auth.user.token : null
    )
    const { show: showDeleteIssueDialogBox, RenderDialogBox: RenderDeleteIssueDialogBox } = useDialogBox();
    const { show: showAssignIssueDialogBox, RenderDialogBox: RenderAssignIssueDialogBox } = useDialogBox();

    const handleDeleteIssue = async ({ projectId, issueId }) => {
        await issuesApi.deleteIssue(projectId, issueId, auth.user.token);
    }

    const handleAssignIssue = async () => {
        
    }

    return (
        <Container fluid>
            <RenderDeleteIssueDialogBox
                heading="Delete Issue"
                submitButtonText="Delete"
                onSubmit={handleDeleteIssue}
                render={({ issueId }) => 'Are you sure you would like to delete issue ' + issueId}
            />
            <RenderAssignIssueDialogBox
                heading="Assign Issue"
                submitButtonText="Assign"
                onSubmit={handleAssignIssue}
                render={() => (
                    <SelectForm initialValues={{collaborator: "who"}} formName="project-collaborators" selectItems={collaborators.data} itemKey="userName"/>
                )}
            />
            <IssueNavBar />
            <IssueList 
                projectId={props.match.params.projectId} 
                issueList={issues.data} 
                onDelete={showDeleteIssueDialogBox}
                onAssign={showAssignIssueDialogBox}
            />
        </Container>
    )
}

export default IssueDashboard;