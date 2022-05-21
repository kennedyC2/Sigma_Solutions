// Import Dependencies
import React, { useState } from "react";
import axios from "axios";
import Spinner from "../Misc/spinner";
import { useNavigate } from "react-router-dom";
import { Notification_A } from "../Misc/notification";
import { domain } from "../Misc/helper";

// Component
const Verify = () => {
    const [spin, setSpin] = useState(0);
    const navigate = useNavigate();

    // Submit Form
    const submitForm = async (e) => {
        e.preventDefault();

        const code = e.target[0].value;
        const email = JSON.parse(localStorage.getItem("pending")).email;

        try {
            await axios({
                method: e.target.method,
                url: domain + "account/verification",
                data: {
                    code: code.toString(),
                    email: email,
                },
            });

            setTimeout(() => {
                // Spinner
                setSpin(1);

                setTimeout(() => {
                    navigate("/login", { replace: true });
                }, 2000);
            }, 2000);
        } catch (error) {
            Notification_A(error.response.data.error, false);
        }
    };

    // Submit Form
    const resendCode = async (e) => {
        const email = JSON.parse(localStorage.getItem("pending")).email;

        try {
            await axios({
                method: "POST",
                url: domain + "account/verification/resend_code",
                data: {
                    email: email,
                },
            });

            // Notify
            Notification_A("Verification Code Sent", true);

            setTimeout(() => {
                return;
            }, 2000);
        } catch (error) {
            // Notify
            Notification_A(error.response.data.error, false);
        }
    };

    return spin === 0 ? (
        <div className="w-100 h-100 d-flex align-items-center justify-content-center">
            <div className="verify p-4" style={{ width: "35%" }}>
                <div className="notify text-center mb-2"></div>
                <form action="#" method="POST" onSubmit={(e) => submitForm(e)}>
                    <div className="mb-3">
                        <label htmlFor="verification" className="form-label mb-3">
                            Enter verification code sent to your email address.
                        </label>
                        <input type="text" className="form-control form-control-sm" id="verification" required />
                    </div>

                    <p className="mt-4 text-danger" style={{ fontSize: "11.5px" }}>
                        <strong> *** Check Spam Folder.</strong>
                    </p>

                    <div className="text-end">
                        <button type="button" className="btn btn-sm btn-primary me-3 px-3" onClick={(e) => resendCode(e)}>
                            Resend
                        </button>
                        <button type="submit" className="btn btn-sm btn-primary px-4">
                            Send
                        </button>
                    </div>
                </form>
            </div>
        </div>
    ) : (
        <Spinner />
    );
};

export default Verify;
