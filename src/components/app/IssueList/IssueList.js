import React from 'react';
import TableList from '../../display/TableList/TableList';
import List from '../../display/List/List';
import IssueListOverviewCard from './IssueListOverviewCard';
import IssueListButtonToolbar from './IssueListButtonToolbar';

const issueDisplayParameters = ["title", "category", "priority", "status", "assigneeId"];

const groups = { 
    priority: ['trivial', 'low', 'regular', 'high', 'critical'],
    category: ['other', 'task', 'feature', 'bug'],
    status: ['closed', 'resolved', 'inprogresss', 'open', 'unassigned'] 
}

function IssueList({ projectId, issueList, groupBy, orderBy, filter, searchText, searchKeys, ...props }) {
    return issueList ?
        (props.viewAs === '2' ? 
            <TableList 
                listItems={issueList} 
                headerKeys={issueDisplayParameters}
                groupKey={groupBy}
                groupValues={groups[groupBy]}
                orderBy={orderBy}
                filter={filter}
                searchText={searchText}
                searchKeys={searchKeys}
                renderButtons={item => <IssueListButtonToolbar projectId={projectId} issue={item} {...props} />}
            /> : <List
                listItems={issueList} 
                groupKey={groupBy}
                groupValues={groups[groupBy]}
                orderBy={orderBy}
                filter={filter}
                searchText={searchText}
                searchKeys={searchKeys}
                render={item => <IssueListOverviewCard projectId={projectId} issue={item} {...props} />}
            />
        )
        : "No Issues"
}

export default IssueList;