import React from 'react';
import List from '../../display/List/List';
import IssueOverview from '../IssueOverview/IssueOverview';

function IssueList({ projectId, issueList, ...props }) {
    return issueList ?
        <List listItems={issueList} render={item => (
            <IssueOverview projectId={projectId} issue={item} {...props} />
        )}/> :
        "No Issues"
}

export default IssueList;