import { postRequest } from "../utils/api";
import { OWNERSHIP_ENDPOINT } from "../utils/endpoints";

export function addOwnership(data) {
    return postRequest(OWNERSHIP_ENDPOINT, data);
}
