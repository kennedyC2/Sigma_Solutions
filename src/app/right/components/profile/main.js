// ========================================================================
//                             Profile
// ========================================================================

// Import libraries
import React from "react";
import Personal from "./components/personal";
import Company from "./components/company";
import UpdatePersonal from "./components/personalForm";
import CompanyForm from "./components/companyForm";
import bg from "../../../../assets/images/Medical-Lab-Water-Filtration-Systems-5db98228a4df4-1200x381.jpg";
import pf from "../../../../assets/images/test-5.jpg";
import { useSelector, useDispatch } from "react-redux";

// App
const Profile = () => {
    const personalData = useSelector((state) => state.profile.personal);
    const companyData = useSelector((state) => state.profile.company);
    const Dispatch = useDispatch();

    const savePersonalData = (e) => {
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
        data["address"] = e.target[9].value;
        data["state"] = e.target[10].value;
        data["country"] = e.target[11].value;

        Dispatch({ type: "profile", payload: data });
    };

    const submitPersonalForm = (e) => {
        e.target.parentNode.parentNode.childNodes[0].childNodes[0][12].click();
    };

    const saveCompanyData = (e) => {
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

        Dispatch({ type: "company", payload: data });
    };

    const submitCompanyForm = (e) => {
        e.target.parentNode.parentNode.childNodes[0].childNodes[0][8].click();
    };

    return (
        <React.Fragment>
            <div className="profile">
                <div>
                    <div className="" id="pfl" style={{ backgroundImage: `url(${bg})` }}></div>
                    <div className="px-5" id="pfg" style={{ borderBottom: "1px solid rgba(149, 170, 201, .3)" }}>
                        <div className="col-auto d-flex">
                            <div>
                                <a href="/profile" className="avatar border border-5 border-white rounded-circle">
                                    <img src={pf} alt="Profile_Picture" className="rounded-circle" width={150} height={150} />
                                </a>
                            </div>
                            <div className="mx-4">
                                <p className="mt-3 mb-2" style={{ fontSize: "12px", textTransform: "Uppercase" }}>
                                    Administrator
                                </p>
                                <h5>Kennedy C. Young</h5>
                            </div>
                            <div></div>
                        </div>
                    </div>
                </div>
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
                                {/* <!-- Button trigger modal --> */}
                                <button type="button" className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop_personal">
                                    Edit Profile
                                </button>
                            </div>

                            {/* <!-- Modal --> */}
                            <div className="modal fade" id="staticBackdrop_personal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered modal-lg" style={{ width: "800px" }}>
                                    <div className="modal-content">
                                        <div className="modal-body">
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
                                <button type="button" className="btn btn-sm btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop_company">
                                    Edit Profile
                                </button>
                            </div>

                            {/* <!-- Modal --> */}
                            <div className="modal fade" id="staticBackdrop_company" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered modal-lg" style={{ width: "800px" }}>
                                    <div className="modal-content">
                                        <div className="modal-body">
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
                            <h6>Users</h6>
                            <div className="px-3 text-center" style={{ padding: "130px 0", border: "1px solid rgba(149, 170, 201, .3)", color: "rgba(149, 170, 201, .8)", borderRadius: ".5rem" }}>
                                Empty
                            </div>
                        </div>
                        <div>
                            <h6>Recent Activities</h6>
                            <div className="px-3 text-center" style={{ padding: "184px 0", border: "1px solid rgba(149, 170, 201, .3)", color: "rgba(149, 170, 201, .8)", borderRadius: ".5rem" }}>
                                No Recent Activity
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Profile;
