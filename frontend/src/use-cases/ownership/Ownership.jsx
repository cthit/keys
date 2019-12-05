import React from "react";
import { DigitCRUD } from "@cthit/react-digit-components";
import { addOwnership } from "../../api/ownership/post.ownership.api";
import { getOwnerships } from "../../api/ownership/get.ownership.api";

const Ownership = () => {
    return (
        <DigitCRUD
            name={"ownership"}
            path={"/ownership"}
            createRequest={addOwnership}
            readAllRequest={getOwnerships}
            readAllKeysOrder={[
                "id",
                "ownerUserName",
                "startDate",
                "returnDate",
                "keyName",
                "deposition",
                "lostKeyPenalty"
            ]}
            keysText={{
                id: "Id",
                ownerUserName: "Owner name",
                startDate: "Date lending",
                returnDate: "Return date",
                keyName: "Key name",
                deposition: "Deposition",
                lostKeyPenalty: "Lost key penalty"
            }}
            dateProps={["startDate", "returnDate"]}
            formInitialValues={{}}
        />
    );
};

export default Ownership;
