// ========================================================================
//                             ListUsers
// ========================================================================

// Import libraries
import { useEffect } from "react";

// App
const ListUsers = (props) => {
    const title = "List";
    const heading = "Users";

    useEffect(() => {
        props.change(title, heading);
    });
    return <div>ListUsers</div>;
};

export default ListUsers;
