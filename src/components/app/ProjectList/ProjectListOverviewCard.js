import React from 'react';
import { Card, Dropdown, DropdownButton } from 'react-bootstrap';
import LinkButton from '../../display/Button/LinkButton';

function ProjectListOverviewCard({ project, onDelete, onEdit, onAddCollaborator }) {
    return (
        <Card style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
            <Card.Body style={{ flex: 1 }}>
                <Card.Title>{project.name}</Card.Title>
                <Card.Text>
                    {project.description}
                </Card.Text>
                <LinkButton variant="primary" to={`/projects/${project.id}`}>View Project</LinkButton>
                <DropdownButton variant="secondary" title="Settings">
                    <Dropdown.Item onClick={() => onEdit(project.id)}>Edit Project</Dropdown.Item>
                    <Dropdown.Item onClick={() => onDelete({ projectId: project.id })}>Delete Project</Dropdown.Item>
                    <Dropdown.Item onClick={() => onAddCollaborator({ projectId: project.id })}>Add Collaborator</Dropdown.Item>
                </DropdownButton>
            </Card.Body>

            <Card.Body style={{ flex: 2, borderLeft: '1px solid black' }}>
                <Card.Title>Issue Details</Card.Title>
                <Card.Text>
                    {"There are " + project.issues.length + " issues related to this project"}
                </Card.Text>
                <LinkButton variant="primary" to={`/projects/${project.id}/issues`}>View Issues</LinkButton>
                <LinkButton variant="secondary" to={`/projects/${project.id}/issues/new`}>Add New Issue</LinkButton>
            </Card.Body>
        </Card>
    )
}

export default ProjectListOverviewCard;