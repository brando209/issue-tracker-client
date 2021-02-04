import React from 'react';
import { Button, Container } from 'react-bootstrap';

import LinkButton from '../../components/display/Button/LinkButton';

function Dashboard() {

    return (
        <Container>
            <LinkButton to="/projects">Projects&Issues</LinkButton>
            <Button>Reports</Button>
        </Container>       
    )
}

export default Dashboard;