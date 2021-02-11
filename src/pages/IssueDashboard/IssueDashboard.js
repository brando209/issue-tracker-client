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
import InlineSearch from '../../components/form/InlineSearch';

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

function IssueDashboard({ issues, ...props }) {
    const auth = useAuth();
    const [collaborators, setCollaborators] = useResource(
        `http://localhost:3001/api/projects/${props.match.params.projectId}/collaborators`,
        auth.user ? auth.user.token : null
    )
    const { show: showDeleteIssueDialogBox, RenderDialogBox: DeleteIssueDialogBox } = useDialogBox();
    const { show: showAssignIssueDialogBox, RenderDialogBox: AssignIssueDialogBox } = useDialogBox();
    const { show: showStartIssueDialogBox, RenderDialogBox: StartIssueDialogBox } = useDialogBox();
    const { show: showCloseIssueDialogBox, RenderDialogBox: CloseIssueDialogBox } = useDialogBox();
    const [listParams, changeListParams] = useListParams({ order: "desc", group: "category", filter: initialFilterValue, search: "" });

    const handleDeleteIssue = async ({ data }) => {
        props.onDelete(data.projectId, data.issueId);
    }

    const handleAssignIssue = async ({ data, values }) => {
        props.onAssign(data.projectId, data.issueId, values.collaboratorId);
    }

    const handleStartIssue = async ({ data }) => {
        props.onStart(data.projectId, data.issueId);
    }

    const handleCloseIssue = async ({ data, values }) => {
        props.onClose(data.projectId, data.issueId, values.status);
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
            <StartIssueDialogBox
                heading="Begin Issue"
                submitButtonText="Advance"
                onSubmit={handleStartIssue}
                render={({ data }) => 'Are you sure you would like to begin issue ' + data.issueId + '? The status of this issue will be advanced to "inprogress".'}
            />
            <CloseIssueDialogBox
                heading="Complete Issue"
                submitButtonText="Complete"
                formId="complete-status"  
                onSubmit={handleCloseIssue}
                render={() => (
                    <>
                        <div>Please select how you would like to complete this issue? </div>
                        <SelectForm 
                            formId="complete-status"  
                            fieldName="status"
                            initialValues={{ "status": ""}} 
                            selectItems={[{ status: "closed" }, { status: "resolved" }]} 
                            itemKey="status"
                        />
                    </>
                )}
            />
            <IssueNavBar render={() => (
                <>
                    <InlineSearch onSubmit={(searchText) => { changeListParams("search", searchText) }}/>
                    <IssueFilterControl 
                        initialFilterValue={initialFilterValue}
                        onSelect={changeListParams}
                    />
                </>
            )}/>
            <IssueList 
                projectId={props.match.params.projectId} 
                issueList={issues}

                groupBy={listParams.group}
                orderBy={listParams.order}
                filter={listParams.filter}
                searchText={listParams.search}
                searchKeys={["title", "description"]}

                onDelete={showDeleteIssueDialogBox}
                onAssign={showAssignIssueDialogBox}
                onStart={showStartIssueDialogBox}
                onClose={showCloseIssueDialogBox}
            />
        </Container>
    )
}

export default IssueDashboard;