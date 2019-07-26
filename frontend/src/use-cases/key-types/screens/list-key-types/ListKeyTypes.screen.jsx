import React, { useEffect } from "react";
import {
    DigitTable,
    DigitLayout,
    DigitFAB,
    DigitDesign
} from "@cthit/react-digit-components";
import { useDispatch, useSelector } from "react-redux";
import { createGetKeyTypesAction } from "../../../../api/key-types/action-creator.key-types.api";
import { createClearKeyTypesAction } from "../../KeyTypes.action-creator";
import Add from "@material-ui/icons/Add";

const ListKeyTypes = () => {
    const dispatch = useDispatch();
    const keyTypes = useSelector(state => state.keyTypes);

    useEffect(() => {
        dispatch(createGetKeyTypesAction());
        return () => {
            dispatch(createClearKeyTypesAction());
        };
    }, []);
    return (
        <>
            <DigitLayout.Center>
                <DigitTable
                    search
                    titleText="Nyckelserier"
                    searchText="Sök efter nyckelserier"
                    showSearchableProps
                    idProp="id"
                    startOrderBy="name"
                    columnsOrder={["id", "name"]}
                    headerTexts={{
                        id: "Id",
                        name: "Namn",
                        __link: "Detaljer"
                    }}
                    data={keyTypes.map(keyType => ({
                        __link: "/key-types/" + keyType.id,
                        ...keyType
                    }))}
                />
            </DigitLayout.Center>
            <DigitLayout.DownRightPosition>
                <DigitDesign.Link to={"/key-types/add"}>
                    <DigitFAB icon={Add} primary />
                </DigitDesign.Link>
            </DigitLayout.DownRightPosition>
        </>
    );
};

export default ListKeyTypes;
