// ========================================================================
//                             AddUser
// ========================================================================

// Import libraries
import { useEffect } from "react";

// App
const AddUser = (props) => {
    const title = "Add";
    const heading = "Users";

    useEffect(() => {
        props.change(title, heading);
    });

    return <div>AddUser</div>;
};

export default AddUser;
