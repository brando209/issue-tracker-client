import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import ProvideAuth from './contexts/AuthContext';
import PrivateRoute from './utility/route/PrivateRoute';
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
                    <PrivateRoute path="/dashboard" component={Dashboard} />
                    <PrivateRoute path="/projects/:projectId/issues/new" component={NewIssuePage} />
                    <PrivateRoute path="/projects/:projectId/issues/:issueId" component={IssueDetails} />
                    <PrivateRoute path="/projects/:projectId/issues" component={IssueDashboard} />
                    <PrivateRoute path="/projects/new" component={NewProjectPage} />
                    <PrivateRoute path="/projects/:projectId/" component={ProjectDetails} />
                    <PrivateRoute path="/projects" component={ProjectDashboard} />
                    <Route path="/">
                        <div>Home</div>
                    </Route>
                </Switch>

            </ProvideAuth>
        </BrowserRouter>
    )


}

export default IssueTracker;