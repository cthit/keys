import { requestPromise } from "../utils/requestPromise";
import { getKeyType, getKeyTypes } from "./get.key-types.api";
import { failed, loading, successfully } from "../utils/simpleActionCreators";
import {
    ADD_KEY_TYPE_FAILED,
    ADD_KEY_TYPE_LOADING,
    ADD_KEY_TYPE_SUCCESSFULLY,
    EDIT_KEY_TYPE_FAILED,
    EDIT_KEY_TYPE_LOADING,
    EDIT_KEY_TYPE_SUCCESSFULLY,
    GET_KEY_TYPE_FAILED,
    GET_KEY_TYPE_LOADING,
    GET_KEY_TYPE_SUCCESSFULLY,
    GET_KEY_TYPES_FAILED,
    GET_KEY_TYPES_LOADING,
    GET_KEY_TYPES_SUCCESSFULLY
} from "./actions.key-types.api";
import { addKeyType } from "./post.key-types.api";
import { editKeyType } from "./put.key-types.api";

export function createGetKeyTypesAction() {
    return requestPromise(
        getKeyTypes,
        loading(GET_KEY_TYPES_LOADING),
        successfully(GET_KEY_TYPES_SUCCESSFULLY),
        failed(GET_KEY_TYPES_FAILED)
    );
}

export function createGetKeyTypeAction(id) {
    return requestPromise(
        () => getKeyType(id),
        loading(GET_KEY_TYPE_LOADING),
        successfully(GET_KEY_TYPE_SUCCESSFULLY),
        failed(GET_KEY_TYPE_FAILED)
    );
}

export function createAddKeyTypeAction(name) {
    return requestPromise(
        () => addKeyType(name),
        loading(ADD_KEY_TYPE_LOADING),
        successfully(ADD_KEY_TYPE_SUCCESSFULLY),
        failed(ADD_KEY_TYPE_FAILED)
    );
}

export function createEditKeyTypeAction(id, name) {
    return requestPromise(
        () => editKeyType(id, name),
        loading(EDIT_KEY_TYPE_LOADING),
        successfully(EDIT_KEY_TYPE_SUCCESSFULLY),
        failed(EDIT_KEY_TYPE_FAILED)
    );
}
