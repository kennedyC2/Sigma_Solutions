// ========================================================================
//                             Left
// ========================================================================

// Import libraries
import LeftTop from "./components/l-top";
import LeftBottom from "./components/l-bottom";

// body
const Left = () => {
    return (
        <div className="left container-fluid col-lg-2 vh-100 position-fixed top-0 start-0">
            <LeftTop />
            <LeftBottom />
        </div>
    );
};

export default Left;
