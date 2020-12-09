import React from 'react';
import { Nav } from 'react-bootstrap';

import LinkButton from '../../display/Button/LinkButton';
import NavBar from '../../display/NavBar/NavBar';

function IssueNavBar() {
    return (
        <NavBar title="Issues" bg="light" render={() => (
            <Nav>
                <LinkButton to="issues/new" variant="outline-dark">Add New Issue</LinkButton>
            </Nav>
        )}/>
    )
}

export default IssueNavBar;