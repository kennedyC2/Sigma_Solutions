// Import Dependencies
import React, { Fragment } from "react";
import { useSelector } from "react-redux";

// Component
const Company = () => {
    const companyData = useSelector((state) => state.company);

    return (
        <Fragment>
            <li className="list-group-item">
                <div className="me-3">Name:</div>
                <div className="text-capitalize">{companyData["name"]}</div>
            </li>
            <li className="list-group-item">
                <div className="me-3">Type:</div>
                <div className="text-capitalize">{companyData["account"]}</div>
            </li>
            <li className="list-group-item">
                <div className="me-3">Registration no:</div>
                <div className="text-capitalize">{companyData["reg_no"]}</div>
            </li>
            <li className="list-group-item">
                <div className="me-3">Phone:</div>
                <div className="text-capitalize">{companyData["phone"]}</div>
            </li>
            <li className="list-group-item">
                <div className="me-3">Email:</div>
                <div>{companyData["email"].charAt(0).toUpperCase() + companyData["email"].replace(companyData["email"][0], "")}</div>
            </li>
            <li className="list-group-item">
                <div className="me-3">Address:</div>
                <div className="text-capitalize">{companyData["address"]}</div>
            </li>
            <li className="list-group-item">
                <div className="me-3">State:</div>
                <div className="text-capitalize">{companyData["state"]}</div>
            </li>
            <li className="list-group-item">
                <div className="me-3">Country:</div>
                <div className="text-capitalize">{companyData["country"]}</div>
            </li>
        </Fragment>
    );
};

export default Company;
