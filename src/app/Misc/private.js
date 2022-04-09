import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

// Component
const Private = () => {
    // Authentication status
    const location = useLocation();
    const auth = location.state || { loggedIn: false };

    // Return
    return auth.loggedIn === true ? <Outlet /> : <Navigate to="/login" />;
};

// Export
export default Private;
