import { BsFillShieldLockFill, BsTelephoneFill } from 'react-icons/bs';
import { CgSpinner } from 'react-icons/cg';

import OtpInput from 'otp-input-react';
import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { toast, Toaster } from 'react-hot-toast';
import { auth } from '../../../../config/firebase.config';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const OTP = () => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const location = useLocation();
    const selectedSim = location.state ? location.state.selectedSim : null;

    let recaptchaVerifier;

    function onSignup() {
        setLoading(true);

        // Initialize RecaptchaVerifier
        recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            size: 'invisible',
            callback: (response) => {
                onCaptchaVerified();
            },
            'expired-callback': () => {
                console.log('Recaptcha expired');
                toast.error('Recaptcha expired. Please try again.');
                setLoading(false);
            },
        });

        // Send OTP to the provided phone number
        const formatPh = '+92' + '3147853906'; // Using selected SIM directly
        signInWithPhoneNumber(auth, formatPh, recaptchaVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setLoading(false);
                setShowOTP(true);
                toast.success('OTP sent successfully!');
            })
            .catch((error) => {
                console.error('Error sending OTP:', error);
                toast.error('Error sending OTP. Please try again.');
                setLoading(false);
            });
    }

    function onOTPVerify() {
        setLoading(true);
        window.confirmationResult
            .confirm(otp)
            .then((result) => {
                console.log('OTP verification successful:', result);
                setUser(result.user);
                setLoading(false);
                toast.success('OTP verified successfully!');
                navigate('/face-verification', { state: { cnic: location.state ? location.state.cnic : null } });
            })
            .catch((error) => {
                console.error('Error verifying OTP:', error);
                toast.error('Error verifying OTP. Please try again.');
                setLoading(false);
            });
    }

    function onCaptchaVerified() {
        // Captcha verified successfully
        console.log('Captcha verified successfully');
    }

    return (
        <section className="flex items-center justify-center h-screen bg-emerald-500">
            <div>
                <Toaster toastOptions={{ duration: 4000 }} />
                <div id="recaptcha-container"></div>
                {user ? (
                    <h2 className="text-2xl font-medium text-center text-white">👍Login Success</h2>
                ) : (
                    <div className="flex flex-col gap-4 p-4 rounded-lg w-80">
                        <h1 className="mb-6 text-3xl font-medium leading-normal text-center text-white">
                            Please verify your selected sim to continue
                        </h1>
                        {showOTP ? (
                            <>
                                <div className="p-4 mx-auto bg-white rounded-full text-emerald-500 w-fit">
                                    <BsFillShieldLockFill size={30} />
                                </div>
                                <label htmlFor="otp" className="text-xl font-bold text-center text-white">
                                    Enter your OTP
                                </label>
                                <OtpInput
                                    value={otp}
                                    onChange={setOtp}
                                    OTPLength={6}
                                    otpType="number"
                                    disabled={false}
                                    autoFocus
                                    className="opt-container "
                                ></OtpInput>
                                <button
                                    onClick={onOTPVerify}
                                    className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                                >
                                    {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
                                    <span>Verify OTP</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="p-4 mx-auto bg-white rounded-full text-emerald-500 w-fit">
                                    <BsTelephoneFill size={30} />
                                </div>
                                <label htmlFor="" className="text-xl font-bold text-center text-white">
                                    Verify your phone number
                                </label>
                                <div className="relative">
                                    <PhoneInput
                                        country={'pk'} // Set country code to Pakistan
                                        value={selectedSim} // Set the selected SIM as value
                                        // containerStyle={{ display: 'none' }} // Hide the input
                                        inputStyle={{
                                            backgroundColor: '#f4f4f4',
                                            paddingRight: '2.5rem',
                                            borderRadius: '0.375rem',
                                            cursor: 'not-allowed',
                                        }} // Style the input field
                                        inputProps={{ readOnly: true }} // Make the input field read-only
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <span className="text-gray-500">{selectedSim}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={onSignup}
                                    className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                                >
                                    {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
                                    <span>Send code via SMS</span>
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default OTP;
