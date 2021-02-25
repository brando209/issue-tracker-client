import React from 'react';
import { Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import List from '../../display/List/List';
import editIcon from '../../../images/edit-icon-png-small.png';

const commentBoxStyle = {
    width: "50vw",
    height: "100%",
    margin: "1em",
};

const CustomToggle = React.forwardRef(({ onClick }, ref) => (
    <img 
        alt=""
        src={editIcon}
        width="25"
        height="25"

        ref={ref}
        onClick={onClick}
    />
));

function CommentList(props) {
    const handleDropdownSelect = (e, id) => {
        if(e === "delete") return props.onDelete({ commentId: id });
    }

    return (
        <List listItems={props.comments} render={(item) => (
            <Row style={commentBoxStyle} key={item.id}>
                <Col lg={11} md={11} sm={10} xs={9}>{"Posted By: " + item.creatorId + " at " + item.created_at }</Col>
                <Col lg={1} md={1} sm={2} xs={3}>
                    <Dropdown onSelect={evt => handleDropdownSelect(evt, item.id)}>
                        <Dropdown.Toggle as={CustomToggle} />

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="edit">Edit</Dropdown.Item>
                            <Dropdown.Item eventKey="delete">Delete</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
                <Col xs={12}>{item.body}</Col>
            </Row>
        )}/>
    )
}

export default CommentList;