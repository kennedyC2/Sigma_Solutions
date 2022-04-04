// ========================================================================
//                             Right
// ========================================================================

// Import libraries
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/main";
import Register from "./components/register/main";
import Unsettled from "./components/unsettled/main";
import Database from "./components/settled/main";
import Users from "./components/users/main";
import TestKits from "./components/testkits/main";
import Services from "./components/services/main";
import Profile from "./components/profile/main";
import Payments from "./components/payment/main";

// body
const Right = () => {
    return (
        <div className="right col-lg-10 min-vh-100 position-absolute top-0 end-0">
            <div className="body container">
                <Routes>
                    <Route path="/" exact element={<Dashboard />} />
                    <Route path="/register" exact element={<Register />} />
                    <Route path="/unsettled" exact element={<Unsettled />} />
                    <Route path="/settled" exact element={<Database />} />
                    <Route path="/laboratory_Users" exact element={<Users />} />
                    <Route path="/laboratory_Testkits" exact element={<TestKits />} />
                    <Route path="/laboratory_Services" exact element={<Services />} />
                    <Route path="/profile" exact element={<Profile />} />
                    <Route path="/payment" exact element={<Payments />} />
                </Routes>
            </div>
        </div>
    );
};

export default Right;
