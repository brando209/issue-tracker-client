import React from 'react';
import useResource from '../../../../../hooks/useResource';
import useAuth from '../../../../../hooks/useAuth';
import { Container } from 'react-bootstrap';


function ProjectsDashboard() {
    const auth = useAuth();
    const projects = useResource('http://localhost:3001/api/projects', auth.user ? auth.user.token : null);

    return (
        <Container>
            {projects.data ? projects.data.map(data => (<pre key={data.id}>{JSON.stringify(data, null)}</pre>)) : "No projects"}
        </Container>
    )
}

export default ProjectsDashboard;