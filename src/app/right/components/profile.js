// ========================================================================
//                             Profile
// ========================================================================

// Import libraries
import { useEffect } from "react";

// App
const Profile = (props) => {
    const title = "Profile";
    const heading = "Settings";

    useEffect(() => {
        props.change(title, heading);
    });
    return <div>Profile</div>;
};

export default Profile;
