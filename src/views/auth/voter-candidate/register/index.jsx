import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { voterRegister } from '../../../../services/voterCandidate/loginService';
import { verifyCitizen } from '../../../../services/citizen';

const VoterRegister = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [cnic, setCnic] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isloading2, setIsloading2] = useState(false);
    const [verified, setVerified] = useState(false);

    const handleLogin = async (e) => {
        console.log('called login');
        e.preventDefault();
        setIsLoading(true);

        try {
            setError('');

            const requestBody = {
                name: name,
                leaderAccountCNIC: cnic,
                password: password,
                proof: 'This is proof',
                selectedSim: '03471623073',
            };

            const response = await voterRegister(requestBody);
            navigate('/voter/login');
        } catch (error) {
            setError(error.message);
            console.log('here', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerify = async () => {
        console.log('called verify');
        try {
            setIsloading2(true);
            const response = await verifyCitizen(cnic);
            console.log('ty', typeof response);
        } catch (error) {
            console.log('here err ');

            console.log(error.message);
        } finally {
            setIsloading2(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className=" w-[30rem] flex flex-col justify-center items-center">
                <h1 className="text-[2.25rem] font-poppins font-bold">Voter Registration</h1>
                <p className="text-[1.125rem] font-poppins font-extralight">Enter your details to access your account</p>

                <form className="flex flex-col w-full gap-1 mt-8" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="cnic" className="font-poppins">
                            CNIC
                        </label>
                        <input
                            type="text"
                            onChange={(e) => setCnic(e.target.value)}
                            className="mt-1 rounded-lg w-full border border-[#BBB] h-12 p-2"
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
                        disabled={isLoading}
                        className={`${
                            isLoading ? 'cursor-not-allowed opacity-70' : ''
                        } p-4 mt-8 text-lg font-bold text-white rounded-md bg-themePurple`}
                    >
                        {isLoading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Register'}
                    </button>
                </form>

                <div className="w-full mt-10">
                    <h1 className="text-xl font-bold text-center">Choose Verification Method</h1>
                    <div className="flex items-center justify-between w-full mt-10">
                        {' '}
                        <button disabled className="px-4 py-2 text-xl font-bold bg-purple-300 cursor-not-allowed opacity-30">
                            OTP
                        </button>
                        <button disabled className="px-4 py-2 text-xl font-bold bg-purple-300 cursor-not-allowed opacity-30">
                            Facial Verification
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VoterRegister;
