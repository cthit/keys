import React, { useEffect } from "react";
import useHistory from "../../../../common/hooks/use-history";
import trimEnd from "lodash/trimEnd";
import { useDispatch, useSelector } from "react-redux";
import { createGetKeyTypeAction } from "../../../../api/key-types/action-creator.key-types.api";
import {
    DigitToastActions,
    DigitDesign,
    DigitLayout,
    DigitText,
    DigitDisplayData,
    DigitButton
} from "@cthit/react-digit-components";
import { createClearKeyTypesAction } from "../../KeyTypes.action-creator";

function getId(history) {
    const pathname = history.location.pathname;
    trimEnd(pathname, "/");

    const split = pathname.split("/");
    return split[split.length - 1];
}

const ViewKeyType = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const keyType = useSelector(state =>
        state.keyTypes.length > 0 ? state.keyTypes[0] : null
    );

    const id = getId(history);

    useEffect(() => {
        dispatch(createGetKeyTypeAction(id)).catch(err => {
            if (err.response.status === 500) {
                dispatch(
                    DigitToastActions.digitToastOpen({
                        text:
                            "Något gick fel när nyckelserie med id: " +
                            id +
                            " försökte hämtas. Kontakta digIT."
                    })
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
                <DigitDesign.Card>
                    <DigitDesign.CardBody>
                        <DigitDisplayData
                            data={keyType}
                            keysText={{
                                id: "Id",
                                name: "Namn"
                            }}
                            keysOrder={["id", "name"]}
                        />
                    </DigitDesign.CardBody>
                    <DigitDesign.CardButtons reverseDirection>
                        <DigitButton
                            text={"Redigera"}
                            onClick={() =>
                                history.push("/key-types/" + id + "/edit")
                            }
                        />
                        <DigitButton
                            text={"Tillbaka"}
                            onClick={() => history.push("/key-types")}
                        />
                    </DigitDesign.CardButtons>
                </DigitDesign.Card>
            </DigitLayout.Center>
        );
    } else {
        return null;
    }
};

export default ViewKeyType;
