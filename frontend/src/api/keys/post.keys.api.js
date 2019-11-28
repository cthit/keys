import { postRequest } from "../utils/api";
import { KEYS_ENDPOINT } from "../utils/endpoints";

export function addKey(data) {
    return postRequest(KEYS_ENDPOINT, data);
}
