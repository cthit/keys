import { KEY_TYPES_ENDPOINT } from "../utils/endpoints";
import { postRequest } from "../utils/api";

export function addKeyType(name) {
    return postRequest(KEY_TYPES_ENDPOINT, { name });
}
