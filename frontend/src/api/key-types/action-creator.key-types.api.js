import { requestPromise } from "../utils/requestPromise";
import { getKeyTypes } from "./get.key-types.api";
import { failed, loading, successfully } from "../utils/simpleActionCreators";
import {
    ADD_KEY_TYPE_ERROR,
    ADD_KEY_TYPE_LOADING,
    ADD_KEY_TYPE_SUCCESSFULLY,
    GET_KEY_TYPES_FAILED,
    GET_KEY_TYPES_LOADING,
    GET_KEY_TYPES_SUCCESSFULLY
} from "./actions.key-types.api";
import { addKeyType } from "./post.key-types.api";

export function createGetKeyTypesAction() {
    return requestPromise(
        getKeyTypes,
        loading(GET_KEY_TYPES_LOADING),
        successfully(GET_KEY_TYPES_SUCCESSFULLY),
        failed(GET_KEY_TYPES_FAILED)
    );
}

export function createAddKeyTypeAction(name) {
    return requestPromise(
        () => addKeyType(name),
        loading(ADD_KEY_TYPE_LOADING),
        successfully(ADD_KEY_TYPE_SUCCESSFULLY),
        failed(ADD_KEY_TYPE_ERROR)
    );
}
