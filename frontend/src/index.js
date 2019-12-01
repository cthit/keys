import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import * as serviceWorker from "./serviceWorker";
import { DigitProviders } from "@cthit/react-digit-components";

function gammaUser(state = { loading: true }, action) {
    switch (action.type) {
        case "GAMMA_USER_GET_LOADING":
            return {
                loading: true
            };
        case "GAMMA_USER_GET_FAILED":
            return {
                loading: false,
                error: true
            };
        case "GAMMA_USER_GET_SUCCESSFULLY": {
            return {
                user: {
                    ...action.payload
                },
                loading: false,
                error: false
            };
        }
        default:
            return state;
    }
}

ReactDOM.render(
    <DigitProviders rootReducer={{ gammaUser }}>
        <App />
    </DigitProviders>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
