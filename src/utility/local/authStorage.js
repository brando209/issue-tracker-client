export function setLocalAuthToken(token) {
    localStorage.setItem("auth_token", token);
}

export function getLocalAuthToken() {
    return localStorage.getItem("auth_token");
}

export function removeLocalAuthToken() {
    localStorage.removeItem("auth_token");
}