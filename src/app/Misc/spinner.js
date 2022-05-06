// Spinner
const Spinner = () => {
    return (
        <div className="text-center m-auto" id="spin">
            <div className="spinner-grow  mt-4" role="status" style={{ color: "rgb(129 151 185)" }}>
                <span className="visually-hidden ">Loading...</span>
            </div>
            <p className="m-3 ps-3" style={{ fontSize: "13px", paddingBottom: "100px", color: "rgb(129 151 185)" }}>
                Please Wait ...
            </p>
        </div>
    );
};

// Export
export default Spinner;
