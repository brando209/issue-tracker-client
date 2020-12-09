import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import useResource from '../../../../hooks/useResource';
import useAuth from '../../../../hooks/useAuth';

function ProjectDetails(props) {
    const auth = useAuth();
    const project = useResource(`http://localhost:3001/api/projects/${props.match.params.projectId}`, auth.user ? auth.user.token : null);
    
    return (
        <Container fluid>
                <Row>
                    <Col as="h3">{project.data.name}</Col>
                </Row>

                <Row>
                    <Col as="p">{project.data.description}</Col>
                </Row>

                <Row>
                    <Col as="h5">Collaborators:</Col>
                </Row>

                <Row>
                    <Col as="h5">Issues:</Col>
                </Row>
        </Container>
    );
}

export default ProjectDetails;