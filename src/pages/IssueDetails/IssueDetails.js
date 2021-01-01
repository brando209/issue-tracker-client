import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import useResource from '../../hooks/useResource';
import useAuth from '../../hooks/useAuth';
import withEdit from '../../components/hocs/withEdit/withEdit';
import issuesApi from '../../api/issues';

import './IssueDetails.css';

function IssueDetails(props) {
    const auth = useAuth();
    const issue = useResource(
        `http://localhost:3001/api/projects/${props.match.params.projectId}/issues/${props.match.params.issueId}`,
        auth.user ? auth.user.token : null
    );

    const EditBox = withEdit(Col, "text");
    const EditArea = withEdit(Col, "textarea");
    const EditSelect = withEdit(Col, "select");

    const handleEdit = async (value) => {
        const result = await issuesApi.updateIssue(props.match.params.projectId, issue.data.id, auth.user.token, value);
        console.log(result);
    }

    return (
        <Container className="IssueDetails" fluid>
                <Row className="justify-content-center title">
                    <EditBox 
                        as="h3" 
                        value={issue.data.title} 
                        name="title" 
                        onEdit={handleEdit}
                    >
                        {issue.data.title}
                    </EditBox>
                </Row>

                <Row>
                    <Col lg={4} md={4} sm={4} xs={4}>Description</Col>
                    <EditArea 
                        as="p" lg={6} md={6} sm={6} xs={6}
                        value={issue.data.description} 
                        name="description" 
                        onEdit={handleEdit}
                    >
                        {issue.data.description}
                    </EditArea>
                </Row>

                <Row>
                    <Col lg={4} md={4} sm={4} xs={4}>Category</Col>
                    <EditSelect 
                        as="p" lg={6} md={6} sm={6} xs={6}
                        value={issue.data.category} 
                        name="category" 
                        onEdit={handleEdit} 
                        options={["bug", "feature", "task"]}
                    >
                        {issue.data.category}
                    </EditSelect>
                </Row>

                <Row>
                    <Col lg={4} md={4} sm={4} xs={4}>Priority</Col>
                    <EditSelect 
                        as="p" lg={6} md={6} sm={6} xs={6}
                        value={issue.data.priority} 
                        name="priority" 
                        onEdit={handleEdit} 
                        options={["critical", "high", "regular", "low", "trivial"]}
                    >
                        {issue.data.priority}
                    </EditSelect>
                </Row>

                <Row>
                    <Col lg={4} md={4} sm={4} xs={4}>Status</Col>
                    <Col as="p" lg={6} md={6} sm={6} xs={6}>{issue.data.status}</Col>
                </Row>

                <Row>
                    <Col lg={4} md={4} sm={4} xs={4}>Created on</Col>
                    <Col as="p" lg={6} md={6} sm={6} xs={6}>{issue.data.created_at}</Col>
                </Row>

                <Row>
                    <Col lg={4} md={4} sm={4} xs={4}>Created by</Col>
                    <Col as="p" lg={6} md={6} sm={6} xs={6}>{issue.data.creatorId}</Col>
                </Row>

                <Row>
                    <Col lg={4} md={4} sm={4} xs={4}>Assigned to</Col>
                    <Col as="p" lg={6} md={6} sm={6} xs={6}>{issue.data.assigneeId}</Col>
                </Row>

        </Container>
    );
}

export default IssueDetails;