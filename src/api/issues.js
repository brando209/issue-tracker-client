import axios from 'axios';
import { authHeader } from './util';

async function createIssue(projectId, issueInfo, authToken) {
    try {
        const headers = authHeader(authToken)
        const issue = await axios.post(`http://localhost:3001/api/projects/${projectId}/issues`, issueInfo, { headers });
        return issue;
    } catch(err) {
        console.log(err);
    }
}

async function updateIssue(projectId, issueId, authToken, update) {
    try {
        const headers = authHeader(authToken);
        const issue = await axios.patch(`http://localhost:3001/api/projects/${projectId}/issues/${issueId}`, update, { headers });
        return issue;
    } catch(err) {
        console.log(err);
    }
}

async function deleteIssue(projectId, issueId, authToken) {
    try {
        const headers = authHeader(authToken);
        const issue = await axios.delete(`http://localhost:3001/api/projects/${projectId}/issues/${issueId}`, { headers });
        return issue;
    } catch(err) {
        console.log(err);
    }
}

const issuesApi = {
    createIssue, updateIssue, deleteIssue
}

export default issuesApi;