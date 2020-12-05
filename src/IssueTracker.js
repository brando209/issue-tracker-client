import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import ProvideAuth from './contexts/AuthContext'
import TopNavBar from './components/app/Navigation/TopNavBar';
import LoginPage from './components/app/page/LoginPage/LoginPage';
import SignupPage from './components/app/page/SignupPage/SignupPage';
import Dashboard from './components/app/page/Dashboard/Dashboard';
import ProjectsDashboard from './components/app/page/projectsAndIssues/ProjectsDashboard/ProjectsDashboard';

function IssueTracker() {
    return (
        <BrowserRouter>
            <ProvideAuth>
                <TopNavBar />

                <Switch>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/signup" component={SignupPage}/>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/projects" component={ProjectsDashboard}/>
                    <Route path="/" component={() => <div>Home</div>} />
                </Switch>

            </ProvideAuth>
        </BrowserRouter>
    )


}

export default IssueTracker;