import { deleteRequest } from "../utils/api";
import { KEY_TYPES_ENDPOINT } from "../utils/endpoints";

export function deleteKeyType(id) {
    return deleteRequest(KEY_TYPES_ENDPOINT + id);
}
