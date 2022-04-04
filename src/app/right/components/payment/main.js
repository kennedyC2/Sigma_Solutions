// ========================================================================
//                             Payment
// ========================================================================

// Import libraries
import React from "react";
import bg from "../../../../assets/images/Medical-Lab-Water-Filtration-Systems-5db98228a4df4-1200x381.jpg";
import visa from "../../../../assets/images/visa-svgrepo-com.svg";
import mastercard from "../../../../assets/images/mastercard-svgrepo-com.svg";

// App
const Payment = () => {
    return (
        <React.Fragment>
            <div className="payment">
                <div className="" id="pyl" style={{ backgroundImage: `url(${bg})` }}></div>
                <div className="pt-4 px-5">
                    <div id="py_1">
                        <div className="mb-4 pb-4">
                            <div className="d-flex justify-content-between p-2">
                                <div>
                                    <strong>Standard Plan</strong>
                                    <p>The perfect way to get started</p>
                                </div>
                                <div>
                                    <h4 className="pt-2">
                                        N10,000 <span style={{ fontSize: ".8rem" }}>(monthly)</span>
                                    </h4>
                                </div>
                            </div>
                            <div className="p-2">
                                <div className="d-flex justify-content-between pb-2">
                                    <p className="mb-0">30 days</p>
                                    <p className="mb-0">12 days remaining</p>
                                </div>
                                <div className="progress mb-3">
                                    <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: "75%" }}></div>
                                </div>
                            </div>
                            <div className="border-top mx-2 text-end">
                                <button className="btn btn-sm btn-outline-secondary mt-3">Change plan</button>
                            </div>
                        </div>
                        <div className="mb-4 pb-4">
                            <div className="px-2 pt-2">
                                <strong>Cards</strong>
                                <p>Recently Used</p>
                            </div>
                            <ul className="list-group px-2">
                                <li className="list-group-item d-flex mb-2">
                                    <img src={visa} alt="" width={"90px"} height={"90px"} />
                                    <div className="d-flex justify-content-between" style={{ width: "calc(100% - 100px)" }}>
                                        <div>
                                            <p className="mb-0 my-3 ms-4">Visa ending in 4219</p>
                                            <p className="mb-0 my-1 ms-4" style={{ color: "rgba(107, 123, 147, .5)" }}>
                                                Expiry date: 05/25
                                            </p>
                                        </div>
                                        <div className="pt-4">
                                            <button className="btn btn-sm btn-outline-danger">Remove</button>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item d-flex mb-2">
                                    <img src={mastercard} alt="" width={"90px"} height={"90px"} />
                                    <div className="d-flex justify-content-between" style={{ width: "calc(100% - 100px)" }}>
                                        <div>
                                            <p className="mb-0 my-3 ms-4">Mastercard ending in 3546</p>
                                            <p className="mb-0 my-1 ms-4" style={{ color: "rgba(107, 123, 147, .5)" }}>
                                                Expiry date: 05/25
                                            </p>
                                        </div>
                                        <div className="pt-4">
                                            <button className="btn btn-sm btn-outline-danger">Remove</button>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="pb-4">
                            <div className="px-2 pt-2">
                                <p>Payment History:</p>
                            </div>
                            <div className="px-2">
                                <table className="table table-bordered" style={{ marginBottom: "0" }}>
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Date</th>
                                            <th scope="col">Receipt</th>
                                            <th scope="col">Subscription</th>
                                            <th scope="col">Expires</th>
                                            <th scope="col">Renewal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>12/3/2019</td>
                                            <td>PD-1234567</td>
                                            <td>6-Months</td>
                                            <td>12/4/2019</td>
                                            <td>12/4/2019</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>12/4/2019</td>
                                            <td>PD-1234567</td>
                                            <td>6-Months</td>
                                            <td>12/5/2019</td>
                                            <td>12/5/2019</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>12/5/2019</td>
                                            <td>PD-1234567</td>
                                            <td>6-Months</td>
                                            <td>12/6/2019</td>
                                            <td>12/6/2019</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">4</th>
                                            <td>12/6/2019</td>
                                            <td>PD-1234567</td>
                                            <td>6-Months</td>
                                            <td>12/7/2019</td>
                                            <td>12/7/2019</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">5</th>
                                            <td>12/7/2019</td>
                                            <td>PD-1234567</td>
                                            <td>6-Months</td>
                                            <td>12/8/2019</td>
                                            <td>12/8/2019</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Payment;
