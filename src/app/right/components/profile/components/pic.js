import React, { useState } from "react";
// import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min.js";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "./cropPic";

// Component
const Profile_Picture = (props) => {
    const { image } = props;
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [width, setWidth] = useState(10);
    const [cropPixel, setCropPixel] = useState(null);

    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCropPixel(croppedAreaPixels);
    };

    const style = {
        cropAreaStyle: {
            border: "1px solid #000000",
        },
        mediaStyle: {
            border: "1px solid #000000",
        },
    };

    const cropImage = async () => {
        console.log("HI");
        const canvas = await getCroppedImg(image, cropPixel);
        console.log(canvas);
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100 w-100" style={{ backgroundColor: "#ffffff" }}>
            <div className="w-75 position-relative h-50">
                <Cropper image={image} crop={crop} zoom={zoom} aspect={4 / 4} onCropChange={setCrop} onCropComplete={onCropComplete} onZoomChange={setZoom} style={style} />
            </div>
            <div className="d-flex w-75 justify-content-between mt-2">
                <button
                    className="btn btn-sm btn-secondary py-0"
                    onClick={() => {
                        if (width > 10) {
                            setZoom(zoom - 0.1);
                            setWidth(width - 10);
                        }
                    }}
                >
                    -
                </button>
                <div className="progress mt-1" style={{ width: "90%" }}>
                    <div className="progress-bar bg-secondary" role="progressbar" style={{ width: `${width}%` }} aria-valuenow={width} aria-valuemin="0" aria-valuemax="100">
                        {width}%
                    </div>
                </div>
                <button
                    className="btn btn-sm btn-secondary py-0"
                    onClick={() => {
                        if (width < 100) {
                            setZoom(zoom + 0.1);
                            setWidth(width + 10);
                        }
                    }}
                >
                    +
                </button>
            </div>
            <div className="w-75 my-3 d-flex justify-content-between">
                <button className="btn btn-sm btn-danger px-3">Cancel</button>
                <button className="btn btn-sm btn-secondary px-3" onClick={() => cropImage()}>
                    Crop Image
                </button>
            </div>
        </div>
    );
};

// Export
export default Profile_Picture;
