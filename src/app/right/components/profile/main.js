// ========================================================================
//                             Profile
// ========================================================================

// Import libraries
import React, { useState, Fragment } from "react";
import Personal from "./components/personal";
import Company from "./components/company";
import UpdatePersonal from "./components/personalForm";
import CompanyForm from "./components/companyForm";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { set } from "idb-keyval";
import { store } from "../../../Misc/cacheStorage";
import bg from "../../../../assets/images/Medical-Lab-Water-Filtration-Systems-5db98228a4df4-1200x381.jpg";
import ProfileTop from "./components/pic";
import { Navigate } from "react-router-dom";
import { one_layer, two_layer } from "../../../Misc/list";
import { month, date, domain } from "../../../Misc/helper";
import { Notification_A } from "../../../Misc/notification";

// App
const Profile = () => {
    const personalData = useSelector((state) => state.personal);
    const companyData = useSelector((state) => state.company);
    const users = useSelector((state) => state.users);
    const admin = useSelector((state) => state.admin);
    const Dispatch = useDispatch();
    const image = domain + "image/" + personalData.display;

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

    const [myImage, setImage] = useState(null);

    const cropImage = (e) => {
        // Check File
        if (e.target.files && e.target.files.length > 0) {
            // Get file
            const file = e.target.files[0];

            // Initiate Reader
            const reader = new FileReader();

            // Read file
            reader.readAsDataURL(file);

            reader.onload = (e) => {
                setImage(e.target.result);
            };
        }
    };

    const savePersonalData = async (e) => {
        e.preventDefault();

        // Define Data
        const data = {};
        data["firstname"] = e.target[0].value;
        data["lastname"] = e.target[1].value;
        data["other"] = e.target[2].value;
        data["sex"] = e.target[3].value;
        data["phone"] = e.target[4].value;
        data["email"] = e.target[5].value;
        data["day"] = e.target[6].value;
        data["month"] = e.target[7].value;
        data["year"] = e.target[8].value;
        data["state"] = e.target[9].value;
        data["country"] = e.target[10].value;

        //  Send
        try {
            const response = await axios({
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                url: domain + "account/update",
                data: { ...data, type: status.path.type, tokenID: status.key, companyID: status.path.companyID },
            });

            const result = response.data;

            // Close
            e.target.parentNode.parentNode.childNodes[1].childNodes[0].click();

            // Update Personal
            await set("personal", result.data, store);

            Dispatch({ type: "profile", payload: result.data });
        } catch (error) {
            // Notify
            Notification_A(error.response.data.error, false, "notifyA");
        }
    };

    const submitPersonalForm = (e) => {
        e.target.parentNode.parentNode.childNodes[0].childNodes[1][11].click();
    };

    const saveCompanyData = async (e) => {
        e.preventDefault();

        // Define Data
        const data = {};
        data["name"] = e.target[0].value;
        data["type"] = e.target[1].value;
        data["phone"] = e.target[2].value;
        data["email"] = e.target[3].value;
        data["reg_no"] = e.target[4].value;
        data["address"] = e.target[5].value;
        data["state"] = e.target[6].value;
        data["country"] = e.target[7].value;

        //  Send
        try {
            const response = await axios({
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                url: domain + "laboratory/update",
                data: { ...data, type: status.path.type, tokenID: status.key, companyID: status.path.companyID },
            });

            // Close
            e.target.parentNode.parentNode.childNodes[1].childNodes[0].click();

            // Update Personal
            await set("company", response.data, store);

            Dispatch({ type: "company", payload: response.data });
        } catch (error) {
            // Notify
            Notification_A(error.response.data.error, false, "notifyB");
        }
    };

    const submitCompanyForm = (e) => {
        e.target.parentNode.parentNode.childNodes[0].childNodes[1][8].click();
    };

    return status.loggedIn === true ? (
        <Fragment>
            {myImage === null ? (
                <Fragment>
                    <div className="" id="pfl" style={{ backgroundImage: `url(${bg})` }}></div>
                    <div className="px-5" id="pfg" style={{ borderBottom: "1px solid rgba(149, 170, 201, .3)" }}>
                        <div className="col-auto d-flex">
                            <div style={{ position: "relative" }}>
                                <a href="/profile" className="avatar border border-5 border-white rounded-circle">
                                    <img src={image} alt="Profile_Picture" className="rounded-circle" width={150} height={150} />
                                </a>
                                <button className="btn chn rounded-circle" onClick={() => document.getElementById("pic").click()}>
                                    Change <br></br> Picture
                                </button>
                                <form action="" style={{ display: "none" }}>
                                    <label htmlFor="pic"></label>
                                    <input type="file" name="pic" id="pic" onChange={(e) => cropImage(e)} />
                                </form>
                            </div>
                            <div className="mx-4">
                                <p className="mt-3 mb-2" style={{ fontSize: "12px", textTransform: "Uppercase" }}>
                                    Administrator
                                </p>
                                <h5 className="text-capitalize">
                                    {personalData["firstname"]} {personalData["lastname"]} {personalData["other"]}
                                </h5>
                            </div>
                            <div></div>
                        </div>
                    </div>
                    <div className="profile">
                        <div className="d-flex pt-4 px-3 justify-content-between">
                            <div id="pf_left">
                                <div className="mb-4 pb-4">
                                    <h6 className="px-3 pt-3 pb-2" style={{ color: "#0076ce" }}>
                                        Personal Profile
                                    </h6>
                                    <ul className="list-group">
                                        <Personal personalData={personalData} />
                                    </ul>
                                    <div className="text-end px-2">
                                        <button type="button" className="btn btn-sm btn-outline-danger px-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop_personal">
                                            Modify
                                        </button>
                                    </div>

                                    <div className="modal fade" id="staticBackdrop_personal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered modal-lg" style={{ width: "800px" }}>
                                            <div className="modal-content">
                                                <div className="modal-body">
                                                    <div className="notifyA text-center mb-2"></div>
                                                    <UpdatePersonal saveData={savePersonalData} personalData={personalData} />
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">
                                                        Close
                                                    </button>
                                                    <button type="button" className="btn btn-primary btn-sm" onClick={(e) => submitPersonalForm(e)}>
                                                        Save
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pb-4">
                                    <h6 className="px-3 pt-3 pb-2" style={{ color: "#0076ce" }}>
                                        Company Profile
                                    </h6>
                                    <ul className="list-group">
                                        <Company />
                                    </ul>
                                    <div className="text-end px-2">
                                        {/* <!-- Button trigger modal --> */}
                                        <button type="button" className="btn btn-sm btn-outline-danger px-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop_company">
                                            Modify
                                        </button>
                                    </div>

                                    {/* <!-- Modal --> */}
                                    <div className="modal fade" id="staticBackdrop_company" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered modal-lg" style={{ width: "800px" }}>
                                            <div className="modal-content">
                                                <div className="modal-body">
                                                    <div className="notifyB text-center mb-2"></div>
                                                    <CompanyForm saveData={saveCompanyData} companyData={companyData} />
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">
                                                        Close
                                                    </button>
                                                    <button type="button" className="btn btn-primary btn-sm" onClick={(e) => submitCompanyForm(e)}>
                                                        Save
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="" id="pf_right">
                                <div className="mb-4">
                                    <div className="d-flex justify-content-between px-3 py-3">
                                        <p className="m-0">Employees</p>
                                        <p className="m-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="22" height="22" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                                <path fill="#95aac9" d="M11.999 1.993c-5.514.001-10 4.487-10 10.001s4.486 10 10.001 10c5.513 0 9.999-4.486 10-10c0-5.514-4.486-10-10.001-10.001zM12 19.994c-4.412 0-8.001-3.589-8.001-8s3.589-8 8-8.001C16.411 3.994 20 7.583 20 11.994c-.001 4.411-3.59 8-8 8z" />
                                                <path fill="#95aac9" d="M12 10.994H8v2h4V16l4.005-4.005L12 7.991z" />
                                            </svg>
                                        </p>
                                    </div>
                                    <ul className="list-group list-group-flush px-2">
                                        {Object.keys(users).length > 0 ? (
                                            one_layer(users).map((item, index) => (
                                                <li key={index} className="list-group-item d-flex pt-1 pb-3 px-2">
                                                    <div className="pt-1">
                                                        <div className="pt-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="25" height="28" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1280 1536">
                                                                <path fill="#95aac9" d="M1280 1271q0 109-62.5 187t-150.5 78H213q-88 0-150.5-78T0 1271q0-85 8.5-160.5t31.5-152t58.5-131t94-89T327 704q131 128 313 128t313-128q76 0 134.5 34.5t94 89t58.5 131t31.5 152t8.5 160.5zm-256-887q0 159-112.5 271.5T640 768T368.5 655.5T256 384t112.5-271.5T640 0t271.5 112.5T1024 384z" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div style={{ width: "calc(100% - 40px)", fontSize: "14px" }}>
                                                        <p className="mb-0 my-1 ms-3 text-capitalize">
                                                            {item.firstname}&nbsp;{item.lastname}&nbsp;{item.other}
                                                        </p>
                                                        <div className="mb-0 ms-3 d-flex justify-content-between" style={{ color: "rgba(107, 123, 147, .5)" }}>
                                                            <p className="mb-0 my-1 text-capitalize">{item.account_type}</p>
                                                            <p className="mb-0 my-1">Online</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        ) : (
                                            <div className="mx-2 text-center" style={{ padding: "125px 0", border: "1px solid rgba(149, 170, 201, .3)", color: "rgba(149, 170, 201, .8)", borderRadius: ".5rem" }}>
                                                -- no data --
                                            </div>
                                        )}
                                    </ul>
                                </div>
                                <div className="p-0" style={{ height: "421px" }}>
                                    <div className="d-flex justify-content-between px-3 py-3">
                                        <p className="m-0">Recent Activities</p>
                                        <p className="m-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="22" height="22" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                                <path fill="#95aac9" d="M11.999 1.993c-5.514.001-10 4.487-10 10.001s4.486 10 10.001 10c5.513 0 9.999-4.486 10-10c0-5.514-4.486-10-10.001-10.001zM12 19.994c-4.412 0-8.001-3.589-8.001-8s3.589-8 8-8.001C16.411 3.994 20 7.583 20 11.994c-.001 4.411-3.59 8-8 8z" />
                                                <path fill="#95aac9" d="M12 10.994H8v2h4V16l4.005-4.005L12 7.991z" />
                                            </svg>
                                        </p>
                                    </div>
                                    <ul className="list-group list-group-flush px-2">
                                        {admin[`${month} ${date}`] !== undefined && Object.keys(admin[`${month} ${date}`]).length > 0 ? (
                                            two_layer(admin, true).map((item, index) => (
                                                <li key={index} className="list-group-item d-flex pt-1 pb-3 px-2">
                                                    <div className="pt-1">
                                                        <div className="extend rounded-circle">
                                                            {/* Assign svg using activity type */}
                                                            {/* =================================================================================================== */}
                                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48">
                                                                <g fill="#95aac9" fillRule="evenodd" clipRule="evenodd">
                                                                    <path d="M6.818 12.864A1.157 1.157 0 0 0 8.455 14.5l.818-.819l4.09 4.09l-3.272 3.274a1.157 1.157 0 1 0 1.636 1.636l1.636-1.636l2.076 2.076a10.079 10.079 0 0 1 2.781-.047l-3.443-3.443l5.354-5.354L31.9 26.047l-5.076 5.076a10.058 10.058 0 0 1 .055 3.438l.394.394a5.787 5.787 0 0 0 6.205 1.296l1.158 1.159a2.313 2.313 0 0 0 2.236.599l2.673 2.673a1.157 1.157 0 1 0 1.637-1.637l-2.674-2.673a2.313 2.313 0 0 0-.6-2.235l-1.158-1.159a5.787 5.787 0 0 0-1.295-6.205l-13.91-13.91l1.637-1.637a1.157 1.157 0 0 0-1.637-1.636l-3.272 3.273l-4.09-4.09l.817-.818a1.157 1.157 0 1 0-1.636-1.637l-6.546 6.546Zm25.93 21.524l2.14-2.14a3.787 3.787 0 0 0-.848-4.06l-.504-.505l-5.353 5.354l.504.504a3.786 3.786 0 0 0 4.061.847Zm3.302 1.607l-.824-.824a5.932 5.932 0 0 0 .445-.444l.824.824a.314.314 0 1 1-.445.444ZM16.86 14.277l-4.09-4.09l-2.082 2.08l4.09 4.09l2.082-2.08Z" />
                                                                    <path d="M14.243 28.828A4.972 4.972 0 0 1 16 28.1V27a1 1 0 1 1 0-2h2a1 1 0 1 1 0 2v1.1c.638.13 1.233.38 1.757.728l.829-.828A1 1 0 0 1 22 26.586L23.414 28A1 1 0 1 1 22 29.414l-.828.829c.347.524.598 1.119.728 1.757H23a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0h-1.1a4.972 4.972 0 0 1-.728 1.757l.828.829A1 1 0 0 1 23.414 38L22 39.414A1 1 0 0 1 20.586 38l-.829-.828A4.973 4.973 0 0 1 18 37.9V39a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2v-1.1a4.972 4.972 0 0 1-1.757-.728l-.829.828A1 1 0 1 1 12 39.414L10.586 38A1 1 0 0 1 12 36.586l.828-.829A4.972 4.972 0 0 1 12.1 34H11a1 1 0 1 1-2 0v-2a1 1 0 1 1 2 0h1.1c.13-.638.38-1.233.728-1.757L12 29.414A1 1 0 0 1 10.586 28l.697-.698l.01-.01l.01-.008l.697-.698A1 1 0 0 1 13.414 28l.829.828ZM14 33a3 3 0 1 1 6 0a3 3 0 0 1-6 0Z" />
                                                                </g>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div style={{ width: "calc(100% - 40px)", fontSize: "14px" }}>
                                                        <p className="mb-0 my-1 ms-3 text-capitalize">
                                                            {item.firstname}&nbsp;{item.lastname}&nbsp;{item.other}
                                                        </p>
                                                        <div className="mb-0 ms-3 d-flex justify-content-between" style={{ color: "rgba(107, 123, 147, .5)" }}>
                                                            <p className="mb-0 my-1">{item.date}</p>
                                                            <p className="mb-0 my-1">{item.time}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        ) : (
                                            <div className="mx-2 text-center" style={{ padding: "160px 0", border: "1px solid rgba(149, 170, 201, .3)", color: "rgba(149, 170, 201, .8)", borderRadius: ".5rem" }}>
                                                -- no data --
                                            </div>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fragment>
            ) : (
                <ProfileTop image={myImage} email={personalData["email"]} tokenID={status.key} removeImage={setImage} />
            )}
        </Fragment>
    ) : (
        <Navigate to="/login" replace={true} />
    );
};

export default Profile;
