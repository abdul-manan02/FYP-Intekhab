import { FileUploader } from 'react-drag-drop-files';
import { useEffect, useState } from 'react';
import { getAllParties } from '../../../services/party/getAllParties';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import toast from 'react-hot-toast';
import { CircularProgress } from '@mui/material';
import { PARTY_BASE_URL } from '../../../util/constants';

const voter = JSON.parse(localStorage.getItem('voter-candidate'));

const CandidateWindow = () => {
    const fileTypes = ['PDF'];
    const [selectedParty, setSelectedParty] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [file, setFile] = useState(null);
    const [parties, setPartes] = useState('');

    const handleChange = (file) => {
        setFile(file);
    };

    const fetchParties = async () => {
        try {
            const res = await getAllParties();
            setPartes(res);
        } catch (error) {
            toast.error(error);
        }
    };

    useEffect(() => {
        fetchParties();
    }, []);

    const handleApply = async () => {
        try {
            setIsLoading(true);

            const formData = new FormData();
            formData.append('documents', file);
            formData.append('partyId', selectedParty);
            formData.append('memberId', voter.account._id);

            const requestOptions = {
                method: 'POST',
                body: formData,
                // headers: {
                //     'Content-Type': 'multipart/form-data',
                // },
            };

            const response = await fetch(`${PARTY_BASE_URL}/api/v1/party/memberApproval`, requestOptions);
            const data = await response.json();

            setIsLoading(false);

            // Handle response data if needed
            console.log('Response:', data);
        } catch (error) {
            setIsLoading(false);
            toast.error('Error applying to join a party');
        }
    };

    return (
        <div>
            <h1 className="rounded-tl-3xl rounded-br-3xl m-[0.5rem] p-[1rem] text-themePurple text-[2.25rem] font-[500] bg-white">Candidate</h1>
            {/* <button onClick={() => console.log(voter.account.isCandidate)}>test</button> */}
            <h1 className="m-[0.5rem] p-[1rem] text-2xl text-themePurple font-semibold">Apply to join a Party</h1>
            {voter && voter.account.isCandidate === 'false' ? (
                <div>
                    <div className="flex flex-col items-center justify-center gap-4">
                        <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
                        <div className="flex flex-col items-center justify-center w-full">
                            <Select
                                displayEmpty
                                placeholder="What's your favorite car?"
                                IconComponent={KeyboardArrowDownIcon}
                                sx={{
                                    width: '50%',
                                    background: 'white',
                                    '.MuiSelect-icon': {
                                        transition: '0.2s',
                                    },
                                    '&.Mui-expanded .MuiSelect-icon': {
                                        transform: 'rotate(-180deg)',
                                    },
                                }}
                                value={selectedParty}
                                onChange={(e) => {
                                    setSelectedParty(e.target.value);
                                }}
                            >
                                <MenuItem disabled value="">
                                    <em>None</em>
                                </MenuItem>
                                {parties &&
                                    parties.map((item, index) => (
                                        <MenuItem key={index} value={`${item._id}`}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </div>
                    </div>
                    <div className="flex items-end justify-end p-[1rem] m-[0.5rem]">
                        <button
                            onClick={handleApply}
                            disabled={isLoading}
                            className={`${
                                isLoading ? 'cursor-not-allowed opacity-70' : ''
                            } p-4 mt-8 text-lg font-bold text-white rounded-md bg-themePurple`}
                        >
                            {isLoading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Apply'}
                        </button>
                    </div>
                </div>
            ) : (
                <h1 className="text-xl text-center">
                    You are already a member of a party. Visit <span className="font-bold">Party</span> tab to view your party
                </h1>
            )}
        </div>
    );
};

export default CandidateWindow;
