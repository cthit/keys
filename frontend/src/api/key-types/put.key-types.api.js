import { putRequest } from "../utils/api";
import { KEY_TYPES_ENDPOINT } from "../utils/endpoints";

export function editKeyType(id, name) {
    return putRequest(KEY_TYPES_ENDPOINT + id, { name });
}
