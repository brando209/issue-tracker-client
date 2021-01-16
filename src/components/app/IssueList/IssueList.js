import React from 'react';
import List from '../../display/List/List';
import IssueOverview from '../IssueOverview/IssueOverview';

const groups = { 
    priority: ['trivial', 'low', 'regular', 'high', 'critical'],
    category: ['other', 'task', 'feature', 'bug'],
    status: ['closed', 'resolved', 'inprogresss', 'open', 'unassigned'] 
}

function IssueList({ projectId, issueList, groupBy, orderBy, filter, ...props }) {
    return issueList ?
        <List
            listItems={issueList} 
            groupKey={groupBy}
            groupValues={groups[groupBy]}
            orderBy={orderBy}
            filter={filter}
            render={item => <IssueOverview projectId={projectId} issue={item} {...props} />}
        /> :
        "No Issues"
}

export default IssueList;