import { getRequest } from "../utils/api";
import { KEYS_ENDPOINT } from "../utils/endpoints";

export function getKeys() {
    return getRequest(KEYS_ENDPOINT);
}

export function getKey(id) {
    return getRequest(KEYS_ENDPOINT + id);
}
