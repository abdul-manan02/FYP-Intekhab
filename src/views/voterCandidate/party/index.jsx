import React, { useEffect, useState } from 'react';
import PartyCard from './components/PartyCard';
import { getAllParties } from '../../../services/party/getAllParties';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Select, MenuItem } from '@mui/material';
import { FileUploader } from 'react-drag-drop-files';
import toast from 'react-hot-toast';
import { CircularProgress } from '@mui/material';
import { PARTY_BASE_URL } from '../../../util/constants';

const Party = () => {
    const voter = JSON.parse(localStorage.getItem('voter-candidate'));
    const [selectedParty, setSelectedParty] = useState('');

    const [parties, setParties] = useState([]);

    const fileTypes = ['PDF'];

    const [file, setFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (file) => {
        setFile(file);
    };

    const fetchParties = async () => {
        try {
            const res = await getAllParties();
            setParties(res);
        } catch (error) {
            toast.error('Failed to apply for Party');
        }
    };

    useEffect(() => {
        // if voters account is upgraded to candidate, only then fetch the parties
        if (voter.account.isCandidate) {
            fetchParties();
        }
    }, []);

    const handleApply = async () => {
        if (!selectedParty || !voter.account._id || !file) {
            toast.error('All fields are required');
            return;
        }
        try {
            setIsLoading(true);

            const formData = new FormData();
            formData.append('partyId', selectedParty);
            formData.append('memberId', voter.account._id);
            formData.append('documents', file);

            const requestOptions = {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${voter.token}`,
                },
            };

            console.log('here');

            const response = await fetch(`${PARTY_BASE_URL}/api/v1/party/memberApproval`, requestOptions);
            const data = await response.json();

            setIsLoading(false);

            toast.success('Application successful and is under review by the Party!');
        } catch (error) {
            setIsLoading(false);
            toast.error('Error applying to join a party');
        }
    };

    const ar = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
        <div>
            <h1 className="rounded-tl-3xl rounded-br-3xl m-[0.5rem] p-[1rem] text-themePurple text-[2.25rem] font-[500] bg-white">Party</h1>
            {voter.account.isCandidate && voter.account.party !== null ? (
                <div className="p-4 m-2">
                    <div className="flex flex-wrap gap-4">
                        {ar.map((item) => {
                            return <PartyCard key={item} />;
                        })}
                    </div>
                </div>
            ) : voter.account.isCandidate && voter.account.party === null ? (
                <>
                    <h1 className="w-1/2 p-4 m-2 mt-5 text-2xl font-bold text-themePurple">Apply to join a party</h1>
                    <div className="flex flex-col w-full p-4 m-2">
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
                                <em>Select a party to apply for</em>
                            </MenuItem>
                            {parties &&
                                parties.map((item, index) => (
                                    <MenuItem key={index} value={`${item._id}`}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                        </Select>
                        <label htmlFor="party" className="mt-2 ml-1 text-sm">
                            Choose a party to apply for
                        </label>
                        <div className="mt-8">
                            <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
                        </div>
                        <label htmlFor="party" className="mt-2 ml-1 text-sm">
                            Add the relevant document in PDF
                        </label>

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
                </>
            ) : (
                <h1 className="w-1/2 mx-auto mt-5 text-xl text-center">
                    Your account doesn't have the candidate privilege, visit <b className="text-red-400 ">Candidate</b> section on the left bar
                </h1>
            )}
        </div>
    );
};

export default Party;
