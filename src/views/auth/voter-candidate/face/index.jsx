import React, { useRef } from 'react';

const FaceVerification = () => {
    const videoRef = useRef(null);

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error('Error accessing camera:', err);
        }
    };

    const capturePicture = () => {
        const canvas = document.createElement('canvas');
        const video = videoRef.current;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageDataURL = canvas.toDataURL('image/png');
        console.log('Captured Picture:', imageDataURL);
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="relative">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full border "
                    onLoadedMetadata={() => {
                        startCamera();
                    }}
                />
                <button
                    className="absolute px-4 py-2 font-bold text-white bg-blue-500 rounded bottom-4 left-4 hover:bg-blue-700"
                    onClick={capturePicture}
                >
                    Capture
                </button>
            </div>
        </div>
    );
};

export default FaceVerification;
