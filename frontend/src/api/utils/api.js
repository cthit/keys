import axios from "axios";
import _ from "lodash";

const path =
    process.env.NODE_ENV === "development" ? "http://127.0.0.1:4000/api" : "";

export function getRequest(endpoint) {
    return axios.get(removeLastSlash(path + endpoint), {
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("auth-keys")
        }
    });
}

export function postRequest(endpoint, data) {
    return axios.post(
        removeLastSlash(path + endpoint, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("auth-keys")
            }
        }),
        data
    );
}

export function deleteRequest(endpoint) {
    return axios.delete(
        removeLastSlash(path + endpoint, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("auth-keys")
            }
        })
    );
}

export function putRequest(endpoint, data) {
    return axios.put(
        removeLastSlash(path + endpoint, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("auth-keys")
            }
        }),
        data
    );
}

function removeLastSlash(path) {
    return _.trimEnd(path, "/");
}
