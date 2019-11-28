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
import HistoryContext from "../common/context/HistoryContext";
import Keys from "../use-cases/keys";
import KeyTypes from "../use-cases/key-types";

const App = () => (
    <DigitProviders>
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
                                    text={"Keys"}
                                    link={"/keys"}
                                />
                                <DigitNavLink
                                    onClick={closeDrawer}
                                    text={"Key types"}
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
                                <Route path={"/keys"} component={Keys} />
                            </Switch>
                        )}
                    />
                </HistoryContext.Provider>
            )}
        />
    </DigitProviders>
);

export default App;
