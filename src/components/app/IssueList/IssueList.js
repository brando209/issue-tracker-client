import React from 'react';
import List from '../../display/List/List';
import IssueOverview from '../IssueOverview/IssueOverview';

const priorityGroup = { priority: ['trivial', 'low', 'regular', 'high', 'critical'] }
const categoryGroup = { category: ['other', 'task', 'feature', 'bug'] }
const statusGroup = { status: ['closed', 'resolved', 'inprogresss', 'open', 'unassigned'] }

function IssueList({ projectId, issueList, groupBy, ...props }) {

    return issueList ?
        <List
            listItems={issueList} 
            groupKey={'category'}
            groupValues={categoryGroup.category}
            orderBy="desc"
            render={item => <IssueOverview projectId={projectId} issue={item} {...props} />}
        /> :
        "No Issues"
}

export default IssueList;