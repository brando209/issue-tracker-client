import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import useAuth from '../../hooks/useAuth';
import useResource from '../../hooks/useResource';

import ProjectsNavBar from '../../components/app/Navigation/ProjectsNavBar';
import ProjectList from '../../components/app/ProjectList/ProjectList';

import NewProjectPage from '../../pages/NewProjectPage/NewProjectPage';
import NewIssuePage from '../../pages/NewIssuePage/NewIssuePage';
import IssueDashboard from '../../pages/IssueDashboard/IssueDashboard';
import ProjectDetails from '../../pages/ProjectDetails/ProjectDetails';

import projectsApi  from '../../api/projects';
import issuesApi  from '../../api/issues';
import useDialogBox from '../../hooks/useDialogBox';
import SelectForm from '../../components/form/SelectForm';


function ProjectDashboard({ match }) {
    const auth = useAuth();
    const [projects, setProjects] = useResource('http://localhost:3001/api/projects', auth.user ? auth.user.token : null);
    const [collaborators, setCollaborators] = useResource('http://localhost:3001/api/user/all', auth.user ? auth.user.token : null);
    const { show: showDeleteProjectDialogBox, RenderDialogBox: DeleteDialogBox } = useDialogBox(); 
    const { show: showAddCollaboratorDialogBox, RenderDialogBox: AddCollaboratorDialogBox } = useDialogBox(); 

    const handleDeleteProject = async ({ data }) => {
        await projectsApi.deleteProject(data.projectId, auth.user.token);
        setProjects(prev => {
            const projects = prev.data.slice();
            const index = projects.findIndex(elem => elem.id === data.projectId);
            projects.splice(index, 1);
            return { ...prev, data: projects };
        });
    }

    const handleAddProject = async (newProject) => {
        const project = await projectsApi.createProject(newProject, auth.user.token);
        setProjects(prev => {
            const projects = prev.data.slice();
            projects.push({ ...project.data, issues: [] }); // TODO: Modify backend to init empty array instead of here
            return { ...prev, data: projects };
        });
    }

    const handleEditProject = async (projectId, updates) => {

    }

    const handleAddCollaborator = async ({ data, values }) => {
        await projectsApi.addProjectCollaborator(data.projectId, values.collaboratorId, auth.user.token);
    }

    const handleCreateIssue = async (projectId, issueDetails) => {
        const newIssue = await issuesApi.createIssue(projectId, issueDetails, auth.user.token);
        setProjects(prev => {
            const projects = prev.data.slice();
            const projectIdx = projects.findIndex(proj => proj.id == projectId);
            projects[projectIdx].issues.push(newIssue);
            return { ...prev, data: projects}
        });
    }

    const handleDeleteIssue = async (projectId, issueId) => {
        await issuesApi.deleteIssue(projectId, issueId, auth.user.token);
        setProjects(prev => {
            const projects = prev.data.slice();
            const projectIdx = projects.findIndex(proj => proj.id == projectId);
            const issueIdx = projects[projectIdx] && projects[projectIdx].issues && projects[projectIdx].issues.length > 0 && projects[projectIdx].issues.findIndex(issue => issue.id === issueId);
            projects[projectIdx].issues.splice(issueIdx, 1);
            return { ...prev, data: projects }
        });
    }
    
    const handleEditIssue = async (projectId, issueId, issueUpdates) => {
        const updatedIssue = await issuesApi.updateIssue(projectId, issueId, issueUpdates, auth.user.token);
        setProjects(prev => {
            const projects = prev.data.slice();
            const projectIdx = projects.findIndex(proj => proj.id == projectId);
            const issueIdx = projects[projectIdx] && projects[projectIdx].issues && projects[projectIdx].issues.length > 0 && projects[projectIdx].issues.findIndex(issue => issue.id === issueId);
            projects[projectIdx].issues[issueIdx] = updatedIssue;
            return { ...prev, data: projects }
        });
    }

    const handleAssignIssue = async (projectId, issueId, collaboratorId) => {
        const updatedIssue = await issuesApi.assignIssue(projectId, issueId, collaboratorId, auth.user.token);
        setProjects(prev => {
            const projects = prev.data.slice();
            const projectIdx = projects.findIndex(proj => proj.id == projectId);
            const issueIdx = projects[projectIdx] && projects[projectIdx].issues && projects[projectIdx].issues.length > 0 && projects[projectIdx].issues.findIndex(issue => issue.id === issueId);
            projects[projectIdx].issues[issueIdx] = updatedIssue;
            return { ...prev, data: projects }
        });
    }

    const handleStartIssue = async (projectId, issueId) => {
        const updatedIssue = await issuesApi.advanceIssue(projectId, issueId, "inprogress", auth.user.token);
        setProjects(prev => {
            const projects = prev.data.slice();
            const projectIdx = projects.findIndex(proj => proj.id == projectId);
            const issueIdx = projects[projectIdx] && projects[projectIdx].issues && projects[projectIdx].issues.length > 0 && projects[projectIdx].issues.findIndex(issue => issue.id === issueId);
            projects[projectIdx].issues[issueIdx] = updatedIssue;
            return { ...prev, data: projects }
        });
    } 

    const handleCloseIssue = async (projectId, issueId, status) => {
        const updatedIssue = await issuesApi.advanceIssue(projectId, issueId, status, auth.user.token);
        setProjects(prev => {
            const projects = prev.data.slice();
            const projectIdx = projects.findIndex(proj => proj.id == projectId);
            const issueIdx = projects[projectIdx] && projects[projectIdx].issues && projects[projectIdx].issues.length > 0 && projects[projectIdx].issues.findIndex(issue => issue.id === issueId);
            projects[projectIdx].issues[issueIdx] = updatedIssue;
            return { ...prev, data: projects }
        });
    }

    return (
        <>
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
            <Switch>
                <Route path={match.url} exact render={() => (
                    <>
                        <ProjectsNavBar />
                        <ProjectList 
                            projectList={projects.data} 
                            onDelete={showDeleteProjectDialogBox} 
                            onEdit={handleEditProject} 
                            onAddCollaborator={showAddCollaboratorDialogBox} 
                        />
                    </>
                )}/>
                <Route path={`${match.url}/:projectId/issues/new`} exact render={(routerProps) => 
                    <NewIssuePage {...routerProps} onSubmit={handleCreateIssue}/>
                }/>
                <Route path={`${match.url}/:projectId/issues`} render={(routerProps) => {
                    const projectIdx = projects.data.findIndex(proj => proj.id == routerProps.match.params.projectId);
                    const issues = (projectIdx !== -1) ? projects.data[projectIdx].issues : []; 
                    console.log("Router", routerProps);
                    return (
                        <IssueDashboard 
                            {...routerProps} 
                            issues={issues} 
                            onDelete={handleDeleteIssue} 
                            onAssign={handleAssignIssue}
                            onStart={handleStartIssue} 
                            onClose={handleCloseIssue}
                            onEdit={handleEditIssue}
                        />
                    )
                }}/>
                <Route path={`${match.url}/new`} exact render={(routerProps) => 
                    <NewProjectPage {...routerProps} onSubmit={handleAddProject} />
                }/>
                <Route path={`${match.url}/:projectId/`} exact render={(routerProps) => 
                    <ProjectDetails {...routerProps} />
                }/>
            </Switch>
        </>
    )
}

export default ProjectDashboard;