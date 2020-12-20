import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

import LinkButton from '../../components/display/Button/LinkButton';
import useAuth from '../../hooks/useAuth';

function Dashboard() {

    return (
        <Container>
            <LinkButton to="/projects">Projects&Issues</LinkButton>
            <Button>Reports</Button>
        </Container>       
    )
}

export default Dashboard;