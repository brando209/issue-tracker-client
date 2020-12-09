import React from 'react';
import { Card, Dropdown, DropdownButton } from 'react-bootstrap';
import LinkButton from '../../../../display/Button/LinkButton';

function IssueOverview({ projectId, issue, onDelete }) {
    const deleteIssue = () => onDelete(projectId, issue.id);

    return (
        <Card style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'row' }}>
            <Card.Body style={{ flex: 1 }}>
                <Card.Title>{issue.title}</Card.Title>
                <Card.Text>
                    {issue.description}
                </Card.Text>
            </Card.Body>

            <Card.Body style={{ flex: 1 }}>
                <LinkButton variant="primary" to={`/projects/${projectId}/issues/${issue.id}`}>View Issue</LinkButton>
                <DropdownButton variant="secondary" title="Settings">
                    <Dropdown.Item onClick={deleteIssue}>Delete Issue</Dropdown.Item>
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