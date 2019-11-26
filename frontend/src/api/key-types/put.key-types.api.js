import { putRequest } from "../utils/api";
import { KEY_TYPES_ENDPOINT } from "../utils/endpoints";

export function editKeyType(id, data) {
    return putRequest(KEY_TYPES_ENDPOINT + id, data);
}
