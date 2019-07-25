import { CLEAR_KEY_TYPES } from "./KeyTypes.actions";

export function createClearKeyTypesAction() {
    return {
        type: CLEAR_KEY_TYPES,
        error: false
    };
}
