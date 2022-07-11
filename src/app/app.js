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
    const [spin, setSpin] = useState(0);
    const fetched = useSelector((state) => state.fetched || InitialState(Dispatch));

    // Confirm log In status
    const [status] = useState(() => {
        return (
            JSON.parse(localStorage.getItem("status")) || {
                loggedIn: false,
                token: false,
                fetched: false,
                path: {
                    type: false,
                    companyID: false,
                },
            }
        );
    });

    return status.loggedIn === true ? (
        fetched.status === true && spin === 0 ? (
            <Fragment>
                <Left setSpin={setSpin} />
                <Right setSpin={setSpin} />
            </Fragment>
        ) : (
            <Spinner />
        )
    ) : (
        navigate("/login", { replace: true })
    );
};

export default App;
