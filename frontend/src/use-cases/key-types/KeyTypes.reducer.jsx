import {
    GET_KEY_TYPE_FAILED,
    GET_KEY_TYPE_SUCCESSFULLY,
    GET_KEY_TYPES_SUCCESSFULLY
} from "../../api/key-types/actions.key-types.api";
import { CLEAR_KEY_TYPES } from "./KeyTypes.actions";

export function keyTypes(state = [], action) {
    switch (action.type) {
        case GET_KEY_TYPES_SUCCESSFULLY:
            return [...action.payload.data];
        case GET_KEY_TYPE_SUCCESSFULLY:
            return [action.payload.data];
        case GET_KEY_TYPE_FAILED:
            return [{}];
        case CLEAR_KEY_TYPES:
            return [];
        default:
            return state;
    }
}
