import React, { useEffect, useState } from "react";
import {
    DigitCRUD,
    DigitSelect,
    DigitTextField
} from "@cthit/react-digit-components";
import { getKeys, getKey } from "../../api/keys/get.keys.api";
import { addKey } from "../../api/keys/post.keys.api";
import { editKey } from "../../api/keys/put.keys.api";
import * as yup from "yup";
import { getKeyTypes } from "../../api/key-types/get.key-types.api";
import { deleteKey } from "../../api/keys/delete.keys.api";

const Keys = () => {
    const [keyTypes, setKeyTypes] = useState(null);

    useEffect(() => {
        getKeyTypes().then(response => {
            const k = {};
            response.data.forEach(keyType => {
                k[keyType.id] = keyType.name;
            });
            setKeyTypes(k);
        });
    }, []);

    if (keyTypes === null) {
        return null;
    }

    return (
        <DigitCRUD
            name={"keys"}
            path={"/keys"}
            readAllRequest={getKeys}
            readOneRequest={getKey}
            createRequest={addKey}
            deleteRequest={deleteKey}
            updateRequest={editKey}
            keysOrder={["id", "name", "status", "keyType"]}
            readAllKeysOrder={["id", "name", "status", "keyTypeName"]}
            readOneKeysOrder={["id", "name", "status", "keyTypeName"]}
            keysText={{
                id: "Id",
                name: "Name",
                status: "Status",
                keyType: "Key type",
                keyTypeName: "Key type"
            }}
            tableProps={{
                startOrderBy: "name",
                name: "Name"
            }}
            idProp={"id"}
            formComponentData={{
                name: {
                    component: DigitTextField,
                    componentProps: {
                        filled: true
                    }
                },
                status: {
                    component: DigitSelect,
                    componentProps: {
                        filled: true,
                        valueToTextMap: {
                            normal: "Normal",
                            broken: "Broken",
                            missing: "Missing"
                        }
                    }
                },
                keyType: {
                    component: DigitSelect,
                    componentProps: {
                        filled: true,
                        valueToTextMap: keyTypes
                    }
                }
            }}
            formInitialValues={{
                name: "",
                status: "normal",
                keyType: ""
            }}
            formValidationSchema={yup.object().shape({
                name: yup.string().required(),
                status: yup
                    .string()
                    .oneOf(["normal", "broken", "missing"])
                    .required(),
                keyType: yup.string().required()
            })}
            useKeyTextsInUpper
        />
    );
};

export default Keys;
