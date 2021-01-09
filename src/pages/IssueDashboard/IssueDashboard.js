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
    const { show: showDeleteIssueDialogBox, RenderDialogBox: DeleteIssueDialogBox } = useDialogBox();
    const { show: showAssignIssueDialogBox, RenderDialogBox: AssignIssueDialogBox } = useDialogBox();

    const handleDeleteIssue = async ({ data }) => {
        await issuesApi.deleteIssue(data.projectId, data.issueId, auth.user.token);
    }

    const handleAssignIssue = async ({ data, values }) => {
        await issuesApi.assignIssue(data.projectId, data.issueId, values.collaboratorId, auth.user.token);
    }

    return (
        <Container fluid>
            <DeleteIssueDialogBox
                heading="Delete Issue"
                submitButtonText="Delete"
                onSubmit={handleDeleteIssue}
                render={({ data }) => (
                    'Are you sure you would like to delete issue ' + data.issueId
                )}
            />
            <AssignIssueDialogBox
                heading="Assign Issue"
                submitButtonText="Assign"
                formId="project-collaborators"  
                onSubmit={handleAssignIssue}
                render={() => (
                    <SelectForm 
                        formId="project-collaborators"  
                        fieldName="collaboratorId"
                        initialValues={{ "collaboratorId": ""}} 
                        selectItems={collaborators.data} 
                        itemKey="userName"
                    />
                )}
            />
            <IssueNavBar />
            <IssueList 
                projectId={props.match.params.projectId} 
                issueList={issues.data}
                groupBy="category"
                onDelete={showDeleteIssueDialogBox}
                onAssign={showAssignIssueDialogBox}
            />
        </Container>
    )
}

export default IssueDashboard;