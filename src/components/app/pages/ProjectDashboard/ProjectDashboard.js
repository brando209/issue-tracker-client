import React from 'react';
import { Container } from 'react-bootstrap';

import useAuth from '../../../../hooks/useAuth';
import useResource from '../../../../hooks/useResource';

import ProjectsNavBar from '../../Navigation/ProjectsNavBar';
import ProjectList from '../pageComponents/ProjectList/ProjectList';

import projectsApi  from '../../../../api/projects';

function ProjectDashboard() {
    const auth = useAuth();
    const projects = useResource('http://localhost:3001/api/projects', auth.user ? auth.user.token : null);

    const deleteProject = async (projectId) => {
        await projectsApi.deleteProject(projectId, auth.user.token);
    }

    return (
        <Container fluid>
            <ProjectsNavBar />
            <ProjectList projectList={projects.data} onDelete={deleteProject}/>
        </Container>
    )
}

export default ProjectDashboard;