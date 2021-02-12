export function setLocalParamStorage(params) {
    localStorage.setItem("list_filter_params", JSON.stringify(params));
}

export function getLocalParamStorage() {
    return JSON.parse(localStorage.getItem("list_filter_params"));
}

export function removeLocalParamStorage() {
    localStorage.removeItem("list_filter_params");
}