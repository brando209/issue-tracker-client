import React from 'react';
import { Row, Col } from 'react-bootstrap';
import List from '../../display/List/List';

const commentBoxStyle = {
    width: "50vw",
    height: "100%",
    margin: "1em",
};

function CommentList(props) {
    return (
        <List listItems={props.comments} render={(item) => (
            <Row style={commentBoxStyle} key={item.id}>
                <Col lg={12}>{"Posted By: " + item.creatorId + " at " + item.created_at }</Col>
                <Col>{item.body}</Col>
            </Row>
        )}/>
    )
}

export default CommentList;