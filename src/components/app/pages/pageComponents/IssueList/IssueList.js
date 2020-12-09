import React from 'react';
import List from '../../../../display/List/List';
import IssueOverview from '../IssueOverview/IssueOverview';

function IssueList({ projectId, issueList, onDelete }) {
    return issueList ?
        <List listItems={issueList} render={item => (
            <IssueOverview projectId={projectId} issue={item} onDelete={onDelete}/>
        )}/> :
        "No Issues"
}

export default IssueList;