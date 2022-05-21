//  Import libraries
import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Left from "./left/main";
import InitialState from "./Misc/initialState";
import Spinner from "./Misc/spinner";
import Right from "./right/right";

// App
const App = () => {
    const navigate = useNavigate;
    const Dispatch = useDispatch();
    const fetched = useSelector((state) => state.fetch || InitialState(Dispatch));

    // Confirm log In status
    const [status] = useState(
        () =>
            JSON.parse(localStorage.getItem("status")) || {
                loggedIn: false,
                token: false,
                path: {
                    type: false,
                    companyID: false,
                },
            }
    );

    return status.loggedIn === true ? (
        fetched === true ? (
            <Fragment>
                <Left />
                <Right />
            </Fragment>
        ) : (
            <Spinner />
        )
    ) : (
        navigate("/login", { replace: true })
    );
};

export default App;
