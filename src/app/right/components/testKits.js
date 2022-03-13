// ========================================================================
//                             TestKits
// ========================================================================

// Import libraries
import { useEffect } from "react";

// App
const TestKits = (props) => {
    const title = "Test Kits";
    const heading = "Laboratory";

    useEffect(() => {
        props.change(title, heading);
    });

    return <div>TestKits</div>;
};

export default TestKits;
