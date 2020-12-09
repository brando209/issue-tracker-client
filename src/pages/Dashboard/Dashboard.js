import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

import LinkButton from '../../components/display/Button/LinkButton';
import useAuth from '../../hooks/useAuth';

function Dashboard() {
    const auth = useAuth();

    return (
        !auth.user ?
            <Redirect to="/" /> :
            <Container>
                <LinkButton to="/projects">Projects&Issues</LinkButton>
                <Button>Reports</Button>

            </Container>       
    )
}

export default Dashboard;