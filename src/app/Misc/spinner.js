// Spinner
const Spinner = () => {
    return (
        <div className="text-center m-auto" id="spin">
            <div className="spinner-grow text-secondary mt-4" role="status">
                <span className="visually-hidden ">Loading...</span>
            </div>
            <p className="m-3 ps-3" style={{ fontSize: "13px", paddingBottom: "200px" }}>
                Please Wait ...
            </p>
        </div>
    );
};

// Export
export default Spinner;
