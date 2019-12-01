import React, { useState } from "react";
import {
    DigitButton,
    DigitDialog,
    DigitHeader,
    DigitLayout,
    DigitLoading,
    DigitNavLink,
    DigitProviders,
    DigitToast
} from "@cthit/react-digit-components";
import { Route, Switch } from "react-router-dom";
import HistoryContext from "../common/context/HistoryContext";
import Keys from "../use-cases/keys";
import KeyTypes from "../use-cases/key-types";
import Ownership from "../use-cases/ownership";
import useGamma from "./useGamma";
import useGammaUser from "./useGammaUser";

const App = () => {
    const name = "MyApp";
    const id = "id";
    const secret = "secret";
    const redirect = "http://localhost:3001/auth/account/callback";
    const gammaPath =
        process.env.REACT_APP_BACKEND_URL || "http://localhost:8081/api";

    const [_, __, ___, login] = useGamma(
        name,
        id,
        secret,
        redirect,
        gammaPath,
        true
    );
    const [user, loading, error] = useGammaUser();

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
                                <DigitButton
                                    text={"login"}
                                    onClick={() => {
                                        login();
                                    }}
                                />
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
