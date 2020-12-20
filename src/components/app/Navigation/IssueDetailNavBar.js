
import React from 'react';
import { Nav } from 'react-bootstrap';

import LinkButton from '../../display/Button/LinkButton';
import NavBar from '../../display/NavBar/NavBar';

function IssueDetailNavBar({ title, ...props }) {
    return (
        <NavBar title={"Issue: " + title} {...props} bg="light" render={() => (
            <Nav>
                <LinkButton variant="outline-dark" onClick={props.onEdit}>Edit Issue</LinkButton>
            </Nav>
        )}/>
    )
}




export default IssueDetailNavBar;