import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { voterRegister } from '../../../../services/voterCandidate/loginService';
import { verifyCitizen } from '../../../../services/citizen';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VoterRegister = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [cnic, setCnic] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isloading2, setIsloading2] = useState(false);
    const [verified, setVerified] = useState(false);
    const [candidateData, setCandidateData] = useState(null);
    const [selectedSim, setSelectedSim] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            setError('');

            const requestBody = {
                // name: name,
                cnic: cnic,
                password: password,
                citizenDataId: candidateData._id,
                selectedSim: selectedSim,
                votingAddress: 'some address',
            };

            // const response = await voterRegister(requestBody);
            navigate('/otp', { state: { selectedSim: selectedSim, cnic: cnic } });
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerify = async () => {
        try {
            setIsloading2(true);
            console.log('cnic', cnic);
            const response = await verifyCitizen(cnic);
            console.log(response);
            if (response.sims.length > 0) {
                setCandidateData(response);
                setVerified(true);
            } else {
                setVerified(false);
            }
        } catch (error) {
            toast.error(error.message, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
                transition: Bounce,
            });
        } finally {
            setIsloading2(false);
        }
    };

    const handleCnicChange = (e) => {
        setCnic(e.target.value);
        // const inputCnic = e.target.value;

        // // Validate CNIC format using regex
        // const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;

        // if (cnicRegex.test(inputCnic)) {
        //     // Update state only if the entered CNIC format is valid
        //     setCnic(inputCnic);
        // }
        // // You can add an else block to handle invalid input if needed
    };

    return (
        <div className="relative flex items-center justify-center h-screen">
            <button
                className="absolute px-4 py-2 text-white rounded-md top-8 right-8 bg-themePurple"
                onClick={() => {
                    navigate('/voter/login');
                }}
            >
                Login
            </button>
            <div className=" w-[30rem] flex flex-col justify-center items-center">
                <h1 className="text-[2.25rem] font-poppins font-bold">Voter Registration</h1>
                <p className="text-[1.125rem] font-poppins font-extralight">Enter your details to register your account</p>

                <form className="flex flex-col w-full gap-1 mt-8" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="cnic" className="font-poppins">
                            CNIC
                        </label>
                        <input
                            type="text"
                            onChange={handleCnicChange}
                            className="mt-1 rounded-lg w-full border border-[#BBB] h-12 p-2"
                            placeholder="Enter CNIC (e.g., 37405-4700448-1)"
                        />

                        <p
                            onClick={handleVerify}
                            className={`${
                                isloading2 ? 'cursor-not-allowed opacity-70' : ''
                            } p-2 mt-2 text-lg font-normal text-white rounded-md bg-themePurple w-fit cursor-pointer`}
                        >
                            {isloading2 ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Verify'}
                        </p>
                    </div>

                    {candidateData && (
                        <>
                            <label htmlFor="sim" className="mt-4 font-poppins">
                                Sim
                            </label>
                            <select onChange={(e) => console.log(e.target.value)} className="mt-1 rounded-lg w-full border border-[#BBB] h-12 p-2">
                                <option value="" disabled hidden defaultValue>
                                    Select an option
                                </option>
                                {candidateData.sims.map((sim, index) => {
                                    return (
                                        <option key={index} value={sim}>
                                            {sim}
                                        </option>
                                    );
                                })}
                            </select>
                        </>
                    )}

                    <label htmlFor="password" className="mt-4 font-poppins">
                        Password
                    </label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 rounded-lg w-full border border-[#BBB] h-12 p-2"
                    />
                    {error !== '' ? <p className="mt-1 text-red-500">{error}</p> : null}
                    <button
                        type="submit"
                        disabled={isLoading || !verified}
                        className={`${
                            isLoading || !verified ? 'cursor-not-allowed opacity-70' : ''
                        } p-4 mt-8 text-lg font-bold text-white rounded-md bg-themePurple`}
                    >
                        {isLoading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Register'}
                    </button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default VoterRegister;
