import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import useResource from '../../hooks/useResource';

import IssueNavBar from '../../components/app/Navigation/IssueNavBar';
import IssueList from '../../components/app/IssueList/IssueList';
import IssueFilterControl from '../../components/app/IssueFilterControl/IssueFilterControl';
import IssueDetails from '../../pages/IssueDetails/IssueDetails';

import useDialogBox from '../../hooks/useDialogBox';
import useListParams from '../../hooks/useListParams';
import SelectForm from '../../components/form/SelectForm';
import InlineSearch from '../../components/form/InlineSearch';
import ToggleButton from '../../components/display/Button/ToggleButton';
import IssueDetailNavBar from '../../components/app/Navigation/IssueDetailNavBar';
import IssueLog from '../IssueLog/IssueLog';

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
    const [collaborators, ] = useResource(
        `http://localhost:3001/api/projects/${props.match.params.projectId}/collaborators`,
        auth.user ? auth.user.token : null
    );
    const { show: showDeleteIssueDialogBox, RenderDialogBox: DeleteIssueDialogBox } = useDialogBox();
    const { show: showAssignIssueDialogBox, RenderDialogBox: AssignIssueDialogBox } = useDialogBox();
    const { show: showStartIssueDialogBox, RenderDialogBox: StartIssueDialogBox } = useDialogBox();
    const { show: showCloseIssueDialogBox, RenderDialogBox: CloseIssueDialogBox } = useDialogBox();
    const [listParams, changeListParams] = useListParams({ order: "desc", group: "category", filter: initialFilterValue, search: "" });
    const [issueView, setIssueView] = useState('1');

    const handleSelectIssueView = (view) => {
        setIssueView(view);
    }

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
        <>
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
            <Switch>
                <Route path={props.match.path} exact render={() => (
                    <>
                        <IssueNavBar render={() => (
                            <>
                                <div>View style:</div>
                                <ToggleButton 
                                    radioValue={issueView} 
                                    radios={[
                                        { name: 'List', value: '1' },
                                        { name: 'Table', value: '2' }
                                    ]}
                                    onSelect={handleSelectIssueView}
                                />
                                <InlineSearch 
                                    className="search-bar"
                                    onSubmit={(searchText) => { changeListParams("search", searchText) }}
                                />
                                <IssueFilterControl 
                                    className="filter-controls"
                                    filters={listParams.filter}
                                    onSelect={changeListParams}
                                />
                            </>
                        )}/>
                        <IssueList 
                            projectId={props.match.params.projectId} 
                            collaborators={collaborators.data}
                            issueList={issues}
                            viewAs={issueView}

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
                    </>
                )}/>
                <Route path={`${props.match.path}/:issueId`} exact render={(routerProps) => {
                    const issueIdx = issues.findIndex(iss => iss.id === Number(routerProps.match.params.issueId));
                    const issue = (issueIdx !== -1) ? issues[issueIdx] : null; 
                    if(!issue) return;
                    return (
                        <>
                            <IssueDetailNavBar title={issue.title} />
                            <IssueDetails 
                                {...routerProps} 
                                issue={issue}
                                collaborators={collaborators.data}
                                onEdit={props.onEdit}
                                onDelete={showDeleteIssueDialogBox}
                                onAssign={showAssignIssueDialogBox}
                                onStart={showStartIssueDialogBox}
                                onClose={showCloseIssueDialogBox}
                            />
                        </>
                    )
                }} />
                <Route path={`${props.match.path}/:issueId/log`} exact render={(routerProps) => {
                    return <IssueLog collaborators={collaborators.data} {...routerProps} />
                }} />
            </Switch>
        </>
    )
}

export default IssueDashboard;