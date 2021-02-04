import React from 'react';
import { Container } from 'react-bootstrap';

import useAuth from '../../hooks/useAuth';
import useResource from '../../hooks/useResource';

import ProjectsNavBar from '../../components/app/Navigation/ProjectsNavBar';
import ProjectList from '../../components/app/ProjectList/ProjectList';

import projectsApi  from '../../api/projects';
import useDialogBox from '../../hooks/useDialogBox';
import SelectForm from '../../components/form/SelectForm';


function ProjectDashboard() {
    const auth = useAuth();
    const projects = useResource('http://localhost:3001/api/projects', auth.user ? auth.user.token : null);
    const collaborators = useResource('http://localhost:3001/api/user/all', auth.user ? auth.user.token : null);
    const { show: showDeleteProjectDialogBox, RenderDialogBox: DeleteDialogBox } = useDialogBox(); 
    const { show: showAddCollaboratorDialogBox, RenderDialogBox: AddCollaboratorDialogBox } = useDialogBox(); 

    const handleDeleteProject = async ({ data }) => {
        await projectsApi.deleteProject(data.projectId, auth.user.token);
    }

    const handleEditProject = async (projectId, updates) => {
        
    }

    const handleAddCollaborator = async ({ data, values }) => {
        await projectsApi.addProjectCollaborator(data.projectId, values.collaboratorId, auth.user.token);
    }

    return (
        <Container fluid>
            <DeleteDialogBox
                heading="Delete Project"
                closeButtonText="Cancel"
                submitButtonText="Delete"
                onSubmit={handleDeleteProject}
                render={({ data }) => 'Are you sure you would like to delete project with id ' + data.projectId + '?'}
            />
            <AddCollaboratorDialogBox
                heading="Add Collaborator"
                submitButtonText="Add"
                formId="collaborator-select-form"
                onSubmit={handleAddCollaborator}
                render={() => (
                    <SelectForm 
                        formId="collaborator-select-form"
                        fieldName="collaboratorId"
                        initialValues={{ "collaboratorId": "" }}
                        selectItems={collaborators.data} 
                        itemKey="userName"
                    />
                )}
            />
            <ProjectsNavBar />
            <ProjectList 
                projectList={projects.data} 
                onDelete={showDeleteProjectDialogBox} 
                onEdit={handleEditProject} 
                onAddCollaborator={showAddCollaboratorDialogBox} 
            />
        </Container>
    )
}

export default ProjectDashboard;