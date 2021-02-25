import axios from 'axios';
import { authHeader } from './util';

async function createIssue(projectId, issueInfo, authToken) {
    try {
        const headers = authHeader(authToken)
        const issue = await axios.post(`http://localhost:3001/api/projects/${projectId}/issues`, issueInfo, { headers });
        return issue.data;
    } catch(err) {
        console.log(err);
    }
}

async function updateIssue(projectId, issueId, update, authToken) {
    try {
        const headers = authHeader(authToken);
        const issue = await axios.patch(`http://localhost:3001/api/projects/${projectId}/issues/${issueId}`, update, { headers });
        return issue.data;
    } catch(err) {
        console.log(err);
    }
}

async function deleteIssue(projectId, issueId, authToken) {
    try {
        const headers = authHeader(authToken);
        const issue = await axios.delete(`http://localhost:3001/api/projects/${projectId}/issues/${issueId}`, { headers });
        return issue.data;
    } catch(err) {
        console.log(err);
    }
}

async function assignIssue(projectId, issueId, assigneeId, authToken) {
    try {
        const headers = authHeader(authToken);
        const issue = await axios.patch(
            `http://localhost:3001/api/projects/${projectId}/issues/${issueId}/assign`,
            { assigneeId },
            { headers }
        )
        return issue.data;
    } catch(err) {
        console.log(err);
    }
}

async function advanceIssue(projectId, issueId, status, authToken) {
    try {
        const headers = authHeader(authToken);
        const issue = await axios.patch(
            `http://localhost:3001/api/projects/${projectId}/issues/${issueId}/advance`,
            { status },
            { headers }
        )
        return issue.data;
    } catch(err) {
        console.log(err);
    }
}

async function addComment(projectId, issueId, comment, authToken) {
    try {
        const headers = authHeader(authToken);
        const result = await axios.post(
            `http://localhost:3001/api/projects/${projectId}/issues/${issueId}/comments`,
            { comment },
            { headers }
        )
        console.log(result);
        return result.data;
    } catch(err) {
        console.log(err);
    }
}

async function deleteComment(projectId, issueId, commentId, authToken) {
    try {
        const headers = authHeader(authToken);
        const result = await axios.delete(
            `http://localhost:3001/api/projects/${projectId}/issues/${issueId}/comments/${commentId}`,
            { headers }
        )
        console.log(result);
        return result.data;
    } catch(err) {
        console.log(err);
    }
}

const issuesApi = {
    createIssue, updateIssue, deleteIssue, assignIssue, advanceIssue, addComment, deleteComment
}

export default issuesApi;