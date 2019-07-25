import { getRequest } from "../utils/api";
import { KEY_TYPES_ENDPOINT } from "../utils/endpoints";

export function getKeyTypes() {
    return getRequest(KEY_TYPES_ENDPOINT);
}
