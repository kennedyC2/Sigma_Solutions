// ========================================================================
//                             Payments
// ========================================================================

// Import libraries
import { useEffect } from "react";

// App
const Payments = (props) => {
    const title = "Payment";
    const heading = "Settings";

    useEffect(() => {
        props.change(title, heading);
    });
    return <div>Payments</div>;
};

export default Payments;
