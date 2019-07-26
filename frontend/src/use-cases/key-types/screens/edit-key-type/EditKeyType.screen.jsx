import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHistory from "../../../../common/hooks/use-history";
import {
    createEditKeyTypeAction,
    createGetKeyTypeAction
} from "../../../../api/key-types/action-creator.key-types.api";
import {
    DigitButton,
    DigitDesign,
    DigitLayout,
    DigitToastActions,
    DigitText,
    DigitEditData,
    DigitTextField
} from "@cthit/react-digit-components";
import { createClearKeyTypesAction } from "../../KeyTypes.action-creator";
import trimEnd from "lodash/trimEnd";
import * as yup from "yup";

function getId(history) {
    const pathname = history.location.pathname;
    trimEnd(pathname, "/");

    const split = pathname.split("/");
    return split[split.length - 2]; //the last bit is /edit, so ignore that
}

const EditKeyType = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const keyType = useSelector(state =>
        state.keyTypes.length > 0 ? state.keyTypes[0] : null
    );

    console.log(keyType);

    const id = getId(history);

    function toast(text) {
        dispatch(
            DigitToastActions.digitToastOpen({
                text
            })
        );
    }

    useEffect(() => {
        dispatch(createGetKeyTypeAction(id)).catch(err => {
            if (err.response.status === 500) {
                toast(
                    "Något gick fel när nyckelserie med id: " +
                        id +
                        " försökte hämtas. Kontakta digIT."
                );
            }
        });
        return () => dispatch(createClearKeyTypesAction());
    }, [id]);

    // Didn't find any key type with the given id
    if (keyType != null && Object.keys(keyType).length === 0) {
        return (
            <DigitLayout.Center>
                <DigitDesign.Card>
                    <DigitDesign.CardBody>
                        <DigitText.Text
                            text={
                                "Det finns ingen nyckelserie med det givna ID:et"
                            }
                        />
                    </DigitDesign.CardBody>
                    <DigitDesign.CardButtons>
                        <DigitButton
                            primary
                            raised
                            text={"Gå till alla nyckelserier"}
                            onClick={() => history.push("/key-types")}
                        />
                    </DigitDesign.CardButtons>
                </DigitDesign.Card>
            </DigitLayout.Center>
        );
    } else if (keyType != null) {
        return (
            <DigitLayout.Center>
                <DigitEditData
                    initialValues={{
                        name: keyType.name
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
                    submitText={"Ändra"}
                    extraButton={{
                        text: "Tillbaka"
                    }}
                    extraButtonTo={"/key-types"}
                    onSubmit={(values, actions) => {
                        const { name } = values;

                        dispatch(createEditKeyTypeAction(id, name))
                            .then(response => {
                                actions.resetForm();
                                toast(
                                    "Nyckelserien har ändrat namn till " + name
                                );
                            })
                            .catch(error => {
                                actions.setSubmitting(false);
                                toast(
                                    "Någonting gick fel när " +
                                        name +
                                        " försöktes ändras. Kontakta digIT."
                                );
                            });
                    }}
                />
            </DigitLayout.Center>
        );
    } else {
        return null;
    }

    return <div>edit</div>;
};

export default EditKeyType;
