import React, { useState } from "react";
import {
    DigitButton,
    DigitDialog,
    DigitHeader,
    DigitLayout,
    DigitLoading,
    DigitNavLink,
    DigitToast,
    useGamma,
    useGammaUser
} from "@cthit/react-digit-components";
import { Route, Switch } from "react-router-dom";
import HistoryContext from "../common/context/HistoryContext";
import Keys from "../use-cases/keys";
import KeyTypes from "../use-cases/key-types";
import Ownership from "../use-cases/ownership";

const App = () => {
    const name = "keys";
    const id = process.env.REACT_APP_GAMMA_ID || "id";
    const secret = process.env.REACT_APP_GAMMA_SECRET || "secret";
    const redirect =
        process.env.REACT_APP_FRONTEND_CALLBACK_URL ||
        "http://localhost:3001/auth/account/callback";
    const gammaPath =
        process.env.REACT_APP_BACKEND_URL || "http://localhost:8081/api";

    const [loading, error, login, logout] = useGamma(
        name,
        id,
        secret,
        redirect,
        gammaPath,
        true
    );
    const [user] = useGammaUser();

    console.log(user);

    return (
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
                                <DigitNavLink
                                    onClick={closeDrawer}
                                    text={"Ownerships"}
                                    link={"/ownership"}
                                />
                            </DigitLayout.Column>
                        )}
                        renderMain={() => (
                            <>
                                {loading && <DigitLoading loading />}
                                {!loading && (
                                    <Switch>
                                        <Route
                                            path={"/key-types"}
                                            component={KeyTypes}
                                        />
                                        <Route
                                            path={"/keys"}
                                            component={Keys}
                                        />
                                        <Route
                                            path={"/ownership"}
                                            component={Ownership}
                                        />
                                    </Switch>
                                )}
                            </>
                        )}
                    />
                </HistoryContext.Provider>
            )}
        />
    );
};

export default App;
