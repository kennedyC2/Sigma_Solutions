// ========================================================================
//                            left-Top
// ========================================================================

// Import libraries
import { Link } from "react-router-dom";

const LeftBottom = () => {
    return (
        <div className="l-bottom">
            <div className="accordion" id="lft">
                <div className="accordion-item my-2">
                    <Link to="/" className="accordion-header" id="Dashboard">
                        <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#contentOne" aria-expanded="true" aria-controls="contentOne">
                            <i className="bi bi-house-door"></i> <span>Dashboard</span>
                        </button>
                    </Link>
                    <div id="contentOne" className="accordion-collapse collapse" aria-labelledby="Dashboard" data-bs-parent="#lft" style={{ display: "none" }}>
                        <div className="accordion-body"></div>
                    </div>
                </div>
                <div className="accordion-item my-2">
                    <div className="accordion-header" id="test">
                        <button className="accordion-button" data-bs-toggle="collapse" data-bs-target="#contentTwo" aria-expanded="false" aria-controls="contentTwo">
                            <i className="bi bi-file-medical"></i> <span>Test</span>
                        </button>
                    </div>
                    <div id="contentTwo" className="accordion-collapse collapse show" aria-labelledby="test" data-bs-parent="#lft">
                        <div className="accordion-body">
                            <ul>
                                <li>
                                    <Link to="/register">Register</Link>
                                </li>
                                <li>
                                    <Link to="/unsettled">Unsettled</Link>
                                </li>
                                <li>
                                    <Link to="/settled">Settled</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="accordion-item my-2">
                    <div className="accordion-header" id="lab">
                        <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#contentFour" aria-expanded="false" aria-controls="contentFour">
                            <i className="bi bi-award"></i> <span>Laboratory</span>
                        </button>
                    </div>
                    <div id="contentFour" className="accordion-collapse collapse" aria-labelledby="lab" data-bs-parent="#lft">
                        <div className="accordion-body">
                            <ul>
                                <li>
                                    <Link to="/laboratory_Users">Users</Link>
                                </li>
                                <li>
                                    <Link to="/laboratory_Testkits">Test Kits</Link>
                                </li>
                                <li>
                                    <Link to="/laboratory_Services">Services</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="accordion-item my-2">
                    <div className="accordion-header" id="setting">
                        <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#contentFive" aria-expanded="false" aria-controls="contentFive">
                            <i className="bi bi-gear"></i> <span>Settings</span>
                        </button>
                    </div>
                    <div id="contentFive" className="accordion-collapse collapse" aria-labelledby="setting" data-bs-parent="#lft">
                        <div className="accordion-body">
                            <ul>
                                <li>
                                    <Link to="/profile">Profile</Link>
                                </li>
                                <li>
                                    <Link to="/payment">Payment</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="accordion-item my-2">
                    <div className="accordion-header" id="logout">
                        <button className="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target="#contentSix" aria-expanded="true" aria-controls="contentSix">
                            <i className="bi bi-box-arrow-right"></i> <span>Log Out</span>
                        </button>
                    </div>
                    <div id="contentSix" className="accordion-collapse collapse" aria-labelledby="logout" data-bs-parent="#lft" style={{ display: "none" }}>
                        <div className="accordion-body"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftBottom;
