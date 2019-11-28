import { deleteRequest } from "../utils/api";
import { KEYS_ENDPOINT } from "../utils/endpoints";

export function deleteKey(id) {
    return deleteRequest(KEYS_ENDPOINT + id);
}
