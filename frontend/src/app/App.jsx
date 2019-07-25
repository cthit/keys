import React from "react";
import {
    DigitHeader,
    DigitNavLink,
    DigitProviders,
    DigitLayout,
    DigitToast,
    DigitDialog
} from "@cthit/react-digit-components";
import { Switch, Route } from "react-router-dom";
import KeyTypes from "../use-cases/key-types";
import { rootReducer } from "./App.reducer";

const App = () => (
    <DigitProviders rootReducer={rootReducer}>
        <>
            <DigitToast />
            <DigitDialog />
            <DigitHeader
                title={"Keys"}
                renderDrawer={closeDrawer => (
                    <DigitLayout.Column>
                        <DigitNavLink
                            onClick={closeDrawer}
                            text={"Nyckelserier"}
                            link={"/key-types"}
                        />
                    </DigitLayout.Column>
                )}
                renderMain={() => (
                    <Switch>
                        <Route path={"/key-types"} component={KeyTypes} />
                    </Switch>
                )}
            />
        </>
    </DigitProviders>
);

export default App;
