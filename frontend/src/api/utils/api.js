import axios from "axios";
import _ from "lodash";

const path =
    process.env.NODE_ENV === "development" ? "http://127.0.0.1:4000/api" : "";

export function getRequest(endpoint) {
    return axios.get(removeLastSlash(path + endpoint));
}

export function postRequest(endpoint, data) {
    return axios.post(removeLastSlash(path + endpoint), data);
}

export function deleteRequest(endpoint) {
    return axios.delete(removeLastSlash(path + endpoint));
}

export function putRequest(endpoint, data) {
    return axios.put(removeLastSlash(path + endpoint), data);
}

function removeLastSlash(path) {
    return _.trimEnd(path, "/");
}
