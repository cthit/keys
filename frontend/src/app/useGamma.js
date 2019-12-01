import axios from "axios";
import useGammaUser from "./useGammaUser";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { DigitToastActions } from "@cthit/react-digit-components";

function updateMe(gammaPath, dispatch) {
    dispatch({
        type: "GAMMA_USER_GET_LOADING",
        error: false
    });
    axios
        .get(removeLastSlash(gammaPath) + "/users/me", {
            headers: {
                Authorization: "Bearer " + sessionStorage.jwtAuth
            }
        })
        .then(response => {
            if (typeof response.data !== "object") {
                //prob html file that says "plz sign in"
                dispatch({
                    type: "GAMMA_USER_GET_FAILED",
                    error: false
                });
            } else {
                dispatch({
                    type: "GAMMA_USER_GET_SUCCESSFULLY",
                    error: false,
                    payload: {
                        ...response.data
                    }
                });
            }
        })
        .catch(error => {
            dispatch({
                type: "GAMMA_USER_GET_FAILED",
                error: false
            });
            console.log(error);
        });
}

function removeLastSlash(path) {
    return _.trimEnd(path, "/");
}

function redirectToGamma(gammaPath, redirect, id) {
    const baseUrl = removeLastSlash(gammaPath) + "/oauth/authorize";
    const responseType = "response_type=code";
    const clientId = "client_id=" + id;
    const redirectUri = "redirect_uri=" + redirect;
    window.location.href =
        baseUrl + "?" + responseType + "&" + clientId + "&" + redirectUri;
}

function useGamma(
    name = "MyApp",
    id = "id",
    secret = "secret",
    redirect = "http://localhost:3001/auth/account/callback",
    gammaPath = "http://localhost:8081/api",
    forceSignedIn = true
) {
    const dispatch = useDispatch();
    const [loadingMe, setLoadingMe] = useState(false);
    const [user, loading, error] = useGammaUser();

    const jwtAuth = sessionStorage.jwtAuth;

    useEffect(() => {
        if (error && !loading) {
            delete sessionStorage.jwtAuth;
            dispatch(
                DigitToastActions.digitToastOpen({
                    text: "Something went wrong when trying to use Gamma",
                    duration: 999999,
                    actionText: "Refresh access via Gamma",
                    actionHandler: () => {
                        redirectToGamma(gammaPath, redirect, id);
                    }
                })
            );
        }
    }, [loading, error]);

    if (!jwtAuth) {
        const paramsResponse = new URLSearchParams(window.location.search);
        const code = paramsResponse.get("code");
        //check if just signed in:
        if (code) {
            const params = new URLSearchParams();
            params.append("grant_type", "authorization_code");
            params.append("client_id", id);
            params.append("redirect_uri", redirect);
            params.append("code", code);

            const c = Buffer.from(id + ":" + secret).toString("base64");

            axios
                .post(
                    removeLastSlash(gammaPath) +
                        "/oauth/token?" +
                        params.toString(),
                    null,
                    {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                            Authorization: "Basic " + c
                        }
                    }
                )
                .then(response => {
                    window.location.href = "/";
                    sessionStorage.jwtAuth = response.data.access_token;
                    setLoadingMe(true);
                    updateMe(gammaPath, dispatch);
                })
                .catch(error => {
                    console.log(error);
                    alert("Something went wrong, really wrong");
                });
        } else {
            if (forceSignedIn) {
                redirectToGamma(gammaPath, redirect, id);
            }
        }
    } else if (!user && !loadingMe) {
        setLoadingMe(true);
        updateMe(gammaPath, dispatch);
    }
    return [
        user,
        loading,
        error,
        () => redirectToGamma(gammaPath, redirect, id)
    ];
}

export default useGamma;
