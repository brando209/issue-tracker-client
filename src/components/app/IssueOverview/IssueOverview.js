import React from 'react';
import { Button, Card, Dropdown, DropdownButton } from 'react-bootstrap';
import LinkButton from '../../display/Button/LinkButton';

function IssueOverview({ projectId, issue, onDelete, onAssign }) {
    const handleDeleteIssue = () => onDelete({ projectId: projectId, issueId: issue.id });
    const handleAssignIssue = () => onAssign({ projectId: projectId, issueId: issue.id });

    return (
        <Card style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'row' }}>
            <Card.Body style={{ flex: 1 }}>
                <Card.Title>{issue.title}</Card.Title>
                <Card.Text>
                    {issue.description}
                </Card.Text>
            </Card.Body>

            <Card.Body style={{ flex: 1 }}>
                <LinkButton variant="primary" to={`/projects/${projectId}/issues/${issue.id}`}>View</LinkButton>
                <Button variant="primary" onClick={handleAssignIssue}>Assign</Button>
                <DropdownButton variant="secondary" title="Settings">
                    <Dropdown.Item >Edit Issue</Dropdown.Item>
                    <Dropdown.Item onClick={handleDeleteIssue}>Delete Issue</Dropdown.Item>
                </DropdownButton>
            </Card.Body>

            <Card.Body style={{ flex: 1, borderLeft: '1px solid black' }}>
                <Card.Title>Category</Card.Title>
                <Card.Text>
                    {issue.category}
                </Card.Text>
            </Card.Body>

            <Card.Body style={{ flex: 1, borderLeft: '1px solid black' }}>
                <Card.Title>Priority</Card.Title>
                <Card.Text>
                    {issue.priority}
                </Card.Text>
            </Card.Body>

            <Card.Body style={{ flex: 1, borderLeft: '1px solid black' }}>
                <Card.Title>Status</Card.Title>
                <Card.Text>
                    {issue.status}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default IssueOverview;