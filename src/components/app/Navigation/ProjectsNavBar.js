import React from 'react';
import { Nav } from 'react-bootstrap';

import LinkButton from '../../display/Button/LinkButton';
import NavBar from '../../display/NavBar/NavBar';

function ProjectsNavBar() {
    return (
        <NavBar title="Projects" bg="light" render={() => (
            <Nav>
                <LinkButton to="/projects/new">Add New Project</LinkButton>
            </Nav>
        )}/>
    )
}

export default ProjectsNavBar;