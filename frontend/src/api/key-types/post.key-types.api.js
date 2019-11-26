import { KEY_TYPES_ENDPOINT } from "../utils/endpoints";
import { postRequest } from "../utils/api";

export function addKeyType(data) {
    return postRequest(KEY_TYPES_ENDPOINT, data);
}
