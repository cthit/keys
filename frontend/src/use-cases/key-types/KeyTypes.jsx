import React from "react";
import { Switch, Route } from "react-router-dom";
import ListKeyTypes from "./screens/list-key-types";
import AddKeyType from "./screens/add-key-type";
import EditKeyType from "./screens/edit-key-type";
import ViewKeyType from "./screens/view-key-type";

const KeyTypes = () => {
    return (
        <Switch>
            <Route exact path={"/key-types/:id/edit"} component={EditKeyType} />
            <Route exact path={"/key-types/:id"} component={ViewKeyType} />
            <Route exact path={"/key-types/add"} component={AddKeyType} />
            <Route exact path={"/key-types"} component={ListKeyTypes} />
        </Switch>
    );
};

export default KeyTypes;
