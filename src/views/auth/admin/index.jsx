import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { adminLogin } from '../../../services/admin/authService';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Web3 from 'web3';
import { STORAGE_ADDRESS, STORAGE_ABI } from '../../../config';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [result, setResult] = useState(null);

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
                console.log(response);
                localStorage.setItem('admin', JSON.stringify({ token: response.token }));
                navigate('/admin/dashboard');
            }
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleTest = async (e) => {
        e.preventDefault();
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const web3 = new Web3(window.ethereum);
            const accounts = await web3.eth.getAccounts();
            console.log('Selected account:', accounts[0]);
            const simpleStorage = new web3.eth.Contract(STORAGE_ABI, STORAGE_ADDRESS);
            await simpleStorage.methods.storeHardcodedValue().send({ from: accounts[0] });
        } catch (err) {
            console.log(err);
        }
    };

    const handleTest2 = async (e) => {
        e.preventDefault();
        try {
            const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545');
            const simpleStorage = new web3.eth.Contract(STORAGE_ABI, STORAGE_ADDRESS);
            let address = '0xaf730dE36e88178117F9Ace98178416f1286394c';

            const value = await simpleStorage.methods.getValue().call({ from: address, gas: 500000 });
            alert(value);
            setResult(`The hard-coded value is ${value}`);
        } catch (e) {
            console.log(e);
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
                    <button onClick={handleTest} disabled={isLoading} className={`p-4 mt-8 text-lg font-bold text-white rounded-md bg-themePurple`}>
                        Store Value
                    </button>
                    <button onClick={handleTest2} disabled={isLoading} className={`p-4 mt-8 text-lg font-bold text-white rounded-md bg-themePurple`}>
                        Get Value
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
