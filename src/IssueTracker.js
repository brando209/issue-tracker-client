import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import ProvideAuth from './contexts/AuthContext'
import TopNavBar from './components/app/Navigation/TopNavBar';
import LoginPage from './components/app/pages/LoginPage/LoginPage';
import SignupPage from './components/app/pages/SignupPage/SignupPage';
import Dashboard from './components/app/pages/Dashboard/Dashboard';
import ProjectDashboard from './components/app/pages/ProjectDashboard/ProjectDashboard';
import NewProjectPage from './components/app/pages/NewProjectPage/NewProjectPage';
import NewIssuePage from './components/app/pages/NewIssuePage/NewIssuePage';
import IssueDashboard from './components/app/pages/IssueDashboard/IssueDashboard';
import ProjectDetails from './components/app/pages/ProjectDetails/ProjectDetails';
import IssueDetails from './components/app/pages/IssueDetails/IssueDetails';

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