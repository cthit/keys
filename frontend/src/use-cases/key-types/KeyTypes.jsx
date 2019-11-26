import React from "react";
import { DigitCRUD, DigitTextField } from "@cthit/react-digit-components";
import { getKeyType, getKeyTypes } from "../../api/key-types/get.key-types.api";
import { addKeyType } from "../../api/key-types/post.key-types.api";
import * as yup from "yup";
import { editKeyType } from "../../api/key-types/put.key-types.api";
import { deleteKeyType } from "../../api/key-types/delete.key-types.api";

const KeyTypes = () => {
    return (
        <DigitCRUD
            name={"key-types"}
            path={"/key-types"}
            readAllRequest={getKeyTypes}
            createRequest={addKeyType}
            readOneRequest={getKeyType}
            updateRequest={editKeyType}
            deleteRequest={deleteKeyType}
            keysOrder={["id", "name"]}
            keysText={{
                id: "Id",
                name: "Name"
            }}
            tableProps={{
                startOrderBy: "name",
                search: true
            }}
            idProp={"id"}
            formInitialValues={{
                name: ""
            }}
            formComponentData={{
                name: {
                    component: DigitTextField,
                    componentProps: {
                        filled: true
                    }
                }
            }}
            formValidationSchema={yup.object().shape({
                name: yup.string().required()
            })}
            detailsButtonText={"Details"}
            dialogDeleteCancel={() => "Cancel"}
            dialogDeleteConfirm={data => "Delete " + data.name}
            dialogDeleteDescription={data =>
                "Are you sure you want to delete " + data.name
            }
            dialogDeleteTitle={data => "Delete " + data.name}
            detailsTitle={data => "Key type: " + data.name}
            updateTitle={data => "Update Key type: " + data.name}
            createTitle={"Create key type"}
            toastDeleteSuccessful={data =>
                "Deletion of " + data.name + " was successfully"
            }
            toastDeleteFailed={data => "Deletion of " + data.name + " failed"}
            toastCreateSuccessful={data => data.name + " was created"}
            toastCreateFailed={data =>
                "Error! " + data.name + " was not created, something went wrong"
            }
            toastUpdateSuccessful={data => data.name + " was updated"}
            toastUpdateFailed={data =>
                "Error! " + data.name + " was not updated"
            }
            useKeyTextsInUpperLabel
        />
    );
};

export default KeyTypes;
