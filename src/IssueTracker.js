import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import ProvideAuth from './contexts/AuthContext'
import TopNavBar from './components/app/Navigation/TopNavBar';

import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import NewProjectPage from './pages/NewProjectPage/NewProjectPage';
import NewIssuePage from './pages/NewIssuePage/NewIssuePage';
import Dashboard from './pages/Dashboard/Dashboard';
import ProjectDashboard from './pages/ProjectDashboard/ProjectDashboard';
import IssueDashboard from './pages/IssueDashboard/IssueDashboard';
import ProjectDetails from './pages/ProjectDetails/ProjectDetails';
import IssueDetails from './pages/IssueDetails/IssueDetails';

function IssueTracker() {

    return (
        <BrowserRouter>
            <ProvideAuth>
                <TopNavBar />
                <Switch>
                    <Route path="/login" component={LoginPage} />
                    <Route path="/signup" component={SignupPage} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/projects/:projectId/issues/new" component={NewIssuePage} />
                    <Route path="/projects/:projectId/issues/:issueId" component={IssueDetails} />
                    <Route path="/projects/:projectId/issues" component={IssueDashboard} />
                    <Route path="/projects/new" component={NewProjectPage} />
                    <Route path="/projects/:projectId/" component={ProjectDetails} />
                    <Route path="/projects" component={ProjectDashboard} />
                    <Route path="/" component={() => <div>Home</div>} />
                </Switch>

            </ProvideAuth>
        </BrowserRouter>
    )


}

export default IssueTracker;