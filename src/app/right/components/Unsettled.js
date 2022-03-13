// ========================================================================
//                             Unsettled
// ========================================================================

// Import libraries
import { useEffect } from "react";

// App
const Unsettled = (props) => {
    const title = "Unsettled";
    const heading = "Tests";

    useEffect(() => {
        props.change(title, heading);
    });

    return <div>Unsettled</div>;
};

export default Unsettled;
