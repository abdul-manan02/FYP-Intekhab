import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const FaceVerification = () => {
    const webcamRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [verificationResult, setVerificationResult] = useState(null);

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCapturedImage(imageSrc);
    };

    const recapture = () => {
        setCapturedImage(null);
        setVerificationResult(null);
    };

    const verifyFace = async () => {
        try {
            const formData = new FormData();
            formData.append('photo', dataURLtoFile(capturedImage, 'captured_image.jpg'));

            const cnic = '55555-5555555-5'; // Hardcoded CNIC value

            const response = await fetch(`http://localhost:5000/verifyImage/${cnic}`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            setVerificationResult(data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Function to convert data URL to File object
    const dataURLtoFile = (dataurl, filename) => {
        const arr = dataurl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    return (
        <div className="flex flex-col items-center justify-center mt-10">
            <h1 className="mb-4 text-2xl font-bold text-center">Face Verification</h1>
            {verificationResult ? (
                <div>
                    <p>Status: {verificationResult.status}</p>
                    <p>Similarity: {verificationResult.similarity}</p>
                    <p>Result: {verificationResult.result ? 'Match Found' : 'No Match Found'}</p>
                    <button className="px-4 py-2 mt-4 text-white rounded-lg bg-themePurple" onClick={recapture}>
                        Recapture
                    </button>
                </div>
            ) : capturedImage ? (
                <div>
                    <img src={capturedImage} alt="Captured" />
                    <div className="flex gap-4">
                        <button className="px-4 py-2 mt-4 text-white rounded-lg bg-themePurple" onClick={recapture}>
                            Recapture
                        </button>
                        <button className="px-4 py-2 mt-4 text-white rounded-lg bg-themePurple" onClick={verifyFace}>
                            Verify
                        </button>
                    </div>
                </div>
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
                    <button className="px-4 py-2 mt-4 text-white rounded-lg bg-themePurple" onClick={capture}>
                        Capture
                    </button>
                </div>
            )}
        </div>
    );
};

export default FaceVerification;
