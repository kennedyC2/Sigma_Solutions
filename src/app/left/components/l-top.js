// ========================================================================
//                            left-Top
// ========================================================================
import picture from "./../../../assets/images/test-5.jpg";

const LeftTop = () => {
    return (
        <div className="l-top">
            <div className="dp m-auto rounded-circle">
                <img src={picture} className="rounded-circle" alt="" style={{ width: "100%", height: "100%" }} />
            </div>
        </div>
    );
};

export default LeftTop;
