import React from 'react';
import { Nav, Button } from 'react-bootstrap';

import LinkButton from '../../display/Button/LinkButton';
import NavBar from '../../display/NavBar/NavBar';

function IssueDetailNavBar({ title, ...props }) {
    return (
        <NavBar title={"Issue: " + title} {...props} bg="light" sticky="top" render={() => (
            <Nav>
                {props.render && typeof props.render === "function" && props.render()}
                <Button variant="outline-dark" onClick={props.onEdit} className="mx-1">Edit Issue</Button>
                <LinkButton variant="outline-dark" to="new">Add New Issue</LinkButton>
            </Nav>
        )}/>    
    )
}




export default IssueDetailNavBar;