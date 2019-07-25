import React from "react";
import { Switch, Route } from "react-router-dom";
import ListKeyTypes from "./screens/list-key-types";
import AddKeyType from "./screens/add-key-type";

const KeyTypes = () => {
    return (
        <Switch>
            <Route exact path={"/key-types/add"} component={AddKeyType} />
            <Route exact path={"/key-types"} component={ListKeyTypes} />
        </Switch>
    );
};

export default KeyTypes;
