import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { adminLogin } from '../../../services/admin/authService';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            setError('');

            const requestBody = {
                username: username,
                password: password,
            };

            const response = await adminLogin(requestBody);

            if (response.result) {
                localStorage.setItem('admin', JSON.stringify(response.result));
                navigate('/admin/dashboard');
            }
        } catch (error) {
            setError(error.message);
            console.log('here', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className=" w-[30rem] flex flex-col justify-center items-center">
                <h1 className="text-[2.25rem] font-poppins font-bold">Admin Login</h1>
                <p className="text-[1.125rem] font-poppins font-extralight">Enter your details to access your account</p>

                <form className="flex flex-col w-full mt-8" onSubmit={handleLogin}>
                    <label htmlFor="cnic" className="font-poppins">
                        username
                    </label>
                    <input
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 rounded-lg w-full border border-[#BBB] h-12 p-2"
                    />

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
            </div>
        </div>
    );
};

export default AdminLogin;
