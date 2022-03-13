// ========================================================================
//                             Right
// ========================================================================

// Import libraries
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Register from "./components/register/register";
import Unsettled from "./components/Unsettled";
import Database from "./components/Database";
import AddUser from "./components/addUser";
import ListUsers from "./components/listUsers";
import TestKits from "./components/testKits";
import Services from "./components/services/services";
import Profile from "./components/profile";
import Payments from "./components/payments";

// body
const Right = () => {
    return (
        <div className="right col-lg-10 min-vh-100 position-absolute top-0 end-0" style={{ backgroundColor: "#f9fbfd" }}>
            <div className="body container">
                <Routes>
                    <Route path="/" exact element={<Dashboard />} />
                    <Route path="/register" exact element={<Register />} />
                    <Route path="/unsettled" exact element={<Unsettled />} />
                    <Route path="/database" exact element={<Database />} />
                    <Route path="/addUser" exact element={<AddUser />} />
                    <Route path="/listUsers" exact element={<ListUsers />} />
                    <Route path="/testkits" exact element={<TestKits />} />
                    <Route path="/services" exact element={<Services />} />
                    <Route path="/profile" exact element={<Profile />} />
                    <Route path="/payment" exact element={<Payments />} />
                </Routes>
            </div>
        </div>
    );
};

export default Right;
