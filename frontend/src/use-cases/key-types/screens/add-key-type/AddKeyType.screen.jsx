import React from "react";

import {
    DigitEditData,
    DigitTextField,
    DigitLayout,
    DigitToastActions
} from "@cthit/react-digit-components";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { createAddKeyTypeAction } from "../../../../api/key-types/action-creator.key-types.api";

const AddKeyType = () => {
    const dispatch = useDispatch();

    function toast(text) {
        dispatch(
            DigitToastActions.digitToastOpen({
                text
            })
        );
    }

    return (
        <DigitLayout.Center>
            <DigitEditData
                initialValues={{
                    name: ""
                }}
                validationSchema={yup.object().shape({
                    name: yup
                        .string()
                        .max(100)
                        .required()
                })}
                keysOrder={["name"]}
                keysComponentData={{
                    name: {
                        component: DigitTextField,
                        componentProps: {
                            filled: true,
                            upperLabel: "Namn på nyckelserien",
                            maxLength: 100
                        }
                    }
                }}
                titleText={"Skapa ny nyckelserie"}
                submitText={"Skapa"}
                extraButton={{
                    text: "Tillbaka"
                }}
                extraButtonTo={"/key-types"}
                onSubmit={(values, actions) => {
                    const { name } = values;

                    dispatch(createAddKeyTypeAction(name))
                        .then(response => {
                            actions.resetForm();
                            toast(name + " har blivit tillagd som nyckelserie");
                        })
                        .catch(error => {
                            actions.setSubmitting(false);
                            toast(
                                "Någonting gick fel när " +
                                    name +
                                    " försöktes lägga till. Kontakta digIT."
                            );
                        });
                }}
            />
        </DigitLayout.Center>
    );
};

export default AddKeyType;
