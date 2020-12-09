import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import useResource from '../../../../hooks/useResource';
import useAuth from '../../../../hooks/useAuth';

function IssueDetails(props) {
    const auth = useAuth();
    const issue = useResource(
        `http://localhost:3001/api/projects/${props.match.params.projectId}/issues/${props.match.params.issueId}`,
        auth.user ? auth.user.token : null
    );
    
    return (
        <Container fluid>
                <Row>
                    <Col as="h3">{issue.data.title}</Col>
                </Row>

                <Row>
                    <Col lg={4}>Description</Col>
                    <Col as="p" lg={6}>{issue.data.description}</Col>
                </Row>

                <Row>
                    <Col lg={4}>Category</Col>
                    <Col as="p" lg={6}>{issue.data.category}</Col>
                </Row>

                <Row>
                    <Col lg={4}>Priority</Col>
                    <Col as="p" lg={6}>{issue.data.priority}</Col>
                </Row>
``
                <Row>
                    <Col lg={4}>Status</Col>
                    <Col as="p" lg={6}>{issue.data.status}</Col>
                </Row>

        </Container>
    );
}

export default IssueDetails;