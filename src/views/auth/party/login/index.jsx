import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { partyLogin } from '../../../../services/party/loginService';

const PartyLogin = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [cnic, setCnic] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            setError('');

            const requestBody = {
                leaderAccountCNIC: cnic,
                password: password,
            };

            const response = await partyLogin(requestBody);
            console.log(response);

            if (response.token) {
                localStorage.setItem('partyToken', JSON.stringify(response));
                navigate('/party/dashboard');
            }
        } catch (error) {
            setError(error.message);
            console.log('here', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative flex items-center justify-center h-screen">
            <button
                className="absolute px-4 py-2 text-white rounded-md top-8 right-8 bg-themePurple"
                onClick={() => {
                    navigate('/party/register');
                }}
            >
                Register
            </button>
            <div className=" w-[30rem] flex flex-col justify-center items-center">
                <h1 className="text-[2.25rem] font-poppins font-bold">Party Login</h1>
                <p className="text-[1.125rem] font-poppins font-extralight">Enter your details to access your account</p>

                <form className="flex flex-col w-full mt-8" onSubmit={handleLogin}>
                    <label htmlFor="cnic" className="font-poppins">
                        CNIC
                    </label>
                    <input type="text" onChange={(e) => setCnic(e.target.value)} className="mt-1 rounded-lg w-full border border-[#BBB] h-12 p-2" />

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
                        {isLoading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Log in'}
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

export default PartyLogin;
