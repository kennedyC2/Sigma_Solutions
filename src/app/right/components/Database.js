// ========================================================================
//                             Database
// ========================================================================

// Import libraries
import { useEffect } from "react";

// App
const Database = (props) => {
    const title = "Database";
    const heading = "Tests";

    useEffect(() => {
        props.change(title, heading);
    });

    return <div>Database</div>;
};

export default Database;
