import React from 'react';
import { Container } from 'react-bootstrap';

import useAuth from '../../hooks/useAuth';
import useResource from '../../hooks/useResource';

import IssueNavBar from '../../components/app/Navigation/IssueNavBar';
import IssueList from '../../components/app/IssueList/IssueList';
import IssueFilterControl from '../../components/app/IssueFilterControl/IssueFilterControl';

import issuesApi  from '../../api/issues';
import useDialogBox from '../../hooks/useDialogBox';
import useListParams from '../../hooks/useListParams';
import SelectForm from '../../components/form/SelectForm';

const initialFilterValue = {
    category: {
        bug: true, 
        feature: true,
        task: true,
        other: true
    },
    priority: {
        critical: true,
        high: true,
        regular: true,
        low: true,
        trivial: true
    },
    status: {
        unassigned: true,
        open: true,
        inprogress: true,
        resolved: true,
        closed: true
    }
}

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
    const [listParams, changeListParams] = useListParams({ order: "asc", group: "none", filter: initialFilterValue });

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
            <IssueNavBar render={() => (
                <IssueFilterControl 
                    initialFilterValue={initialFilterValue}
                    onSelect={changeListParams}
                />
            )}/>
            <IssueList 
                projectId={props.match.params.projectId} 
                issueList={issues.data}

                groupBy={listParams.group}
                orderBy={listParams.order}
                filter={listParams.filter}

                onDelete={showDeleteIssueDialogBox}
                onAssign={showAssignIssueDialogBox}
            />
        </Container>
    )
}

export default IssueDashboard;