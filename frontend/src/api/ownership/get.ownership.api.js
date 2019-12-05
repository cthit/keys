import { getRequest } from "../utils/api";
import { OWNERSHIP_ENDPOINT } from "../utils/endpoints";

export function getOwnerships() {
    return getRequest(OWNERSHIP_ENDPOINT);
}
