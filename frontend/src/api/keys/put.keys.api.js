import { putRequest } from "../utils/api";
import { KEYS_ENDPOINT } from "../utils/endpoints";

export function editKey(id, data) {
    return putRequest(KEYS_ENDPOINT + id, data);
}
