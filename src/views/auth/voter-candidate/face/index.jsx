import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const FaceVerification = () => {
    const webcamRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
    };

    const recapture = () => {
        setCapturedImage(null);
    };

    return (
        <div className="mt-10 flex flex-col justify-center items-center">
            <h1 className="text-center font-bold text-2xl mb-4">Face Verification</h1>
            {capturedImage ? (
                <>
                    <img src={capturedImage} alt="Captured" />
                    <div className="flex gap-4">
                        {' '}
                        <button className="bg-themePurple text-white px-4 py-2 rounded-lg mt-4" onClick={recapture}>
                            Recapture
                        </button>
                        <button className="bg-themePurple text-white px-4 py-2 rounded-lg mt-4" onClick={recapture}>
                            Verify
                        </button>
                    </div>
                </>
            ) : (
                <div>
                    <Webcam
                        audio={false}
                        height={600}
                        width={600}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={{ facingMode: 'user' }}
                    />
                    <button className="bg-themePurple text-white px-4 py-2 rounded-lg mt-4" onClick={capture}>
                        Capture
                    </button>
                </div>
            )}
        </div>
    );
};

export default FaceVerification;
