// Import Dependencies
import React, { Fragment } from "react";
import { Link } from "react-router-dom";

// Component
const Index = () => {
    return (
        <Fragment>
            <div>
                <div className="bg-1" style={{ width: "100%", height: "73%" }}>
                    <div className="m-auto py-1" style={{ width: "85%" }}>
                        <nav className="navbar navbar-expand-lg navbar-light">
                            <div className="container-fluid px-2">
                                <Link className="navbar-brand" to="#">
                                    WELCOME
                                </Link>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                                    <div className="navbar-nav">
                                        <Link className="nav-link" to="/login">
                                            <button className="btn btn-outline-light btn-sm px-3">Login</button>
                                        </Link>
                                        <Link className="nav-link ms-2" to="/register">
                                            <button className="btn btn-outline-light btn-sm px-3">Register</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
                <div style={{ width: "100%", height: "27%" }}>
                    <div className="d-flex justify-content-between m-auto" style={{ width: "85%", textAlign: "justify" }}>
                        <div className="py-3 px-2" style={{ width: "30%", fontSize: "14px" }}>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt quidem, quae veniam modi voluptates eos et dolorem unde aliquam? Harum consectetur necessitatibus eligendi ipsam sed cupiditate rem ratione tempore in!
                        </div>
                        <div className="py-3 px-2" style={{ width: "30%", fontSize: "14px" }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex vitae officiis beatae inventore dicta at molestiae magnam sunt asperiores ab optio pariatur magni temporibus, repudiandae rerum porro suscipit adipisci nostrum!
                        </div>
                        <div className="py-3 px-2" style={{ width: "30%", fontSize: "14px" }}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam quam deleniti doloribus quas in libero aut perferendis placeat asperiores laudantium numquam, minus amet laborum quis tenetur dolorum est obcaecati earum?
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Index;
