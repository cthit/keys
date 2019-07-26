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
import HistoryContext from "../common/context/HistoryContext";

const App = () => (
    <DigitProviders rootReducer={rootReducer}>
        <Route
            render={({ history }) => (
                <HistoryContext.Provider value={history}>
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
                                <Route
                                    path={"/key-types"}
                                    component={KeyTypes}
                                />
                            </Switch>
                        )}
                    />
                </HistoryContext.Provider>
            )}
        />
    </DigitProviders>
);

export default App;
