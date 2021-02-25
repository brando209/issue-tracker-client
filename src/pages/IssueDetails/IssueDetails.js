import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import CommentList from '../../components/app/CommentList/CommentList';
import useResource from '../../hooks/useResource';
import useAuth from '../../hooks/useAuth';
import useDialogBox from '../../hooks/useDialogBox';
import withEdit from '../../components/hocs/withEdit/withEdit';
import issuesApi from '../../api/issues';

import './IssueDetails.css';

function IssueDetails({ issue, ...props }) {
    const auth = useAuth();
    const [comments, setComments] = useResource(
        `http://localhost:3001/api/projects/${props.match.params.projectId}/issues/${props.match.params.issueId}/comments`,
        auth.user ? auth.user.token : null
    );
    const { show: showDeleteCommentDialogBox, RenderDialogBox: DeleteCommentDialogBox } = useDialogBox();

    const EditBox = withEdit(Col, "text");
    const EditArea = withEdit(Col, "textarea");
    const EditSelect = withEdit(Col, "select");

    const handleEditIssue = async (value) => {
        console.log(value);
        props.onEdit(props.match.params.projectId, issue.id, value);
    }

    const handleAddComment = async (e) => {
        e.preventDefault();
        const commentData = e.target[1].value
        const newComment = await issuesApi.addComment(props.match.params.projectId, issue.id, commentData, auth.user.token);
        setComments(prev => {
            const comments = prev.data.slice();
            comments.push(newComment);
            return { ...prev, data: comments }
        })
    }

    const handleDeleteComment = async ({ data }) => {
        console.log("Deleting comment", data);
        const deletedComment = await issuesApi.deleteComment(props.match.params.projectId, issue.id, data.commentId, auth.user.token);
        console.log(deletedComment);
        setComments(prev => {
            const comments = prev.data.slice();
            const commentIdx = comments.findIndex(comment => comment.id === data.commentId);
            if(commentIdx !== -1) comments.splice(commentIdx, 1);
            return { ...prev, data: comments };
        })
    }

    return (
        <Container className="IssueDetails" fluid>
            <DeleteCommentDialogBox 
                heading="Delete Project"
                closeButtonText="Cancel"
                submitButtonText="Delete"
                onSubmit={handleDeleteComment}
                render={({ data }) => 'Are you sure you would like to delete this comment: ' + data.commentId + '?'}
            />
            <Row className="justify-content-center title">
                <EditBox 
                    as="h3" 
                    value={issue.title} 
                    name="title" 
                    onEdit={handleEditIssue}
                >
                    {issue.title}
                </EditBox>
            </Row>

            <Row>
                <Col lg={4} md={4} sm={4} xs={4}>Description</Col>
                <EditArea 
                    as="p" lg={6} md={6} sm={6} xs={6}
                    value={issue.description} 
                    name="description" 
                    onEdit={handleEditIssue}
                >
                    {issue.description}
                </EditArea>
            </Row>

            <Row>
                <Col lg={4} md={4} sm={4} xs={4}>Category</Col>
                <EditSelect 
                    as="p" lg={6} md={6} sm={6} xs={6}
                    value={issue.category} 
                    name="category" 
                    onEdit={handleEditIssue} 
                    options={["bug", "feature", "task"]}
                >
                    {issue.category}
                </EditSelect>
            </Row>

            <Row>
                <Col lg={4} md={4} sm={4} xs={4}>Priority</Col>
                <EditSelect 
                    as="p" lg={6} md={6} sm={6} xs={6}
                    value={issue.priority} 
                    name="priority" 
                    onEdit={handleEditIssue} 
                    options={["critical", "high", "regular", "low", "trivial"]}
                >
                    {issue.priority}
                </EditSelect>
            </Row>

            <Row>
                <Col lg={4} md={4} sm={4} xs={4}>Status</Col>
                <Col as="p" lg={6} md={6} sm={6} xs={6}>
                    {issue.status}
                </Col>
            </Row>

            <Row>
                <Col lg={4} md={4} sm={4} xs={4}>Created on</Col>
                <Col as="p" lg={6} md={6} sm={6} xs={6}>{issue.created_at}</Col>
            </Row>

            <Row>
                <Col lg={4} md={4} sm={4} xs={4}>Created by</Col>
                <Col as="p" lg={6} md={6} sm={6} xs={6}>{issue.creatorId}</Col>
            </Row>

            <Row>
                <Col lg={4} md={4} sm={4} xs={4}>Assigned to</Col>
                <Col as="p" lg={6} md={6} sm={6} xs={6}>{(issue.assigneeId) ? issue.assigneeId : "Unassigned"}</Col>
            </Row>

            <Row>
                <Col lg={4} md={4} sm={4} xs={4}>Assigned on</Col>
                <Col as="p" lg={6} md={6} sm={6} xs={6}>{(issue.opened_at) ? issue.opened_at : "N/A"}</Col>
            </Row>

            <Row>
                <Col lg={4} md={4} sm={4} xs={4}>Resolved/Closed on</Col>
                <Col as="p" lg={6} md={6} sm={6} xs={6}>{(issue.closed_at) ? issue.closed_at : "N/A"}</Col>
            </Row>

            <Row>
                <Col lg={4} md={4} sm={4} xs={4}>
                    <Button variant="outline-primary" type="submit" form="add-comment">Add Comment</Button>
                </Col>
                <Col lg={4} md={4} sm={4} xs={4}>
                    <Form id="add-comment" onSubmit={handleAddComment}>
                        <Form.Group controlId="comment">
                            <Form.Control as="textarea" placeholder="Enter comment" />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            
            <Row>
                <Col lg={4} md={4} sm={4} xs={4}>Comments</Col>
                <CommentList 
                    comments={comments.data} 
                    onDelete={showDeleteCommentDialogBox}
                />
            </Row>

        </Container>
    );
}

export default IssueDetails;