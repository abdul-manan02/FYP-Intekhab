import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { verifyCitizen } from '../../../../services/citizen';
import toast from 'react-hot-toast';
import { FileUploader } from 'react-drag-drop-files';
import { PARTY_BASE_URL } from '../../../../util/constants';

const PartyRegister = () => {
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

    const fileTypePDF = ['PDF'];
    const fileTypeImage = ['PNG', 'JPG'];

    const [doc, setDoc] = useState(null);
    const [image, setImage] = useState(null);

    const handleDocChange = (file) => {
        setDoc(file);
    };

    const handleImageChange = (file) => {
        setImage(file);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log(name, cnic, password, selectedSim, doc, image)

        if (!name || !cnic || !password || !selectedSim || !doc || !image) {
            toast.error('All fields are required!');
            return;
        }

        try {
            setIsLoading(true);

            const formData = new FormData();
            formData.append('name', name);
            formData.append('leaderAccountCNIC', cnic);
            formData.append('password', password);
            formData.append('selectedSim', selectedSim);

            // Append files to formData
            formData.append('documents', doc); 
            formData.append('documents', image); 

            const requestOptions = {
                method: 'POST',
                body: formData,
            };
            const url = `${PARTY_BASE_URL}/api/v1/party/signup`;
            const response = await fetch(url, requestOptions);
            const data = await response.json();

            setIsLoading(false);

            toast.success('Application successful and is under review by the admin!');
        } catch (error) {
            setIsLoading(false);
            toast.error('Error applying to join a party');
        }
    };

    const handleVerify = async () => {
        try {
            setIsloading2(true);
            const response = await verifyCitizen(cnic);
            console.log(response);
            if (response.sims.length > 0) {
                setCandidateData(response);
                setVerified(true);
            } else {
                setVerified(false);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsloading2(false);
        }
    };

    const handleCnicChange = (e) => {
        setCnic(e.target.value);
    };

    return (
        <div className="relative flex items-center justify-center h-screen">
            <button
                className="absolute px-4 py-2 text-white rounded-md top-8 right-8 bg-themePurple"
                onClick={() => {
                    navigate('/party/login');
                }}
            >
                Login
            </button>
            <div className=" w-[30rem] flex flex-col justify-center items-center">
                <h1 className="text-[2.25rem] font-poppins font-bold">Party Registration</h1>
                <p className="text-[1.125rem] font-poppins font-extralight">Enter your details to register your account</p>

                <form className="flex flex-col w-full gap-1 mt-8" onSubmit={handleRegister}>
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
                            <select onChange={(e) => setSelectedSim(e.target.value)} className="mt-1 rounded-lg w-full border border-[#BBB] h-12 p-2">
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

                    <label htmlFor="name" className="mt-4 font-poppins">
                        Party Name
                    </label>
                    <input type="name" onChange={(e) => setName(e.target.value)} className="mt-1 rounded-lg w-full border border-[#BBB] h-12 p-2" />

                    <label htmlFor="name" className="mt-4 font-poppins">
                        Relevant Document
                    </label>
                    <FileUploader handleChange={handleDocChange} name="file" types={fileTypePDF} />

                    <label htmlFor="name" className="mt-4 font-poppins">
                        Party Logo
                    </label>
                    <FileUploader handleChange={handleImageChange} name="file" types={fileTypeImage} />

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
        </div>
    );
};

export default PartyRegister;
