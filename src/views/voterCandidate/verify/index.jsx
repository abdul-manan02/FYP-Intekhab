import React, { useEffect, useRef, useState } from 'react';
import { TextField } from '@mui/material';
import { verifyVote } from '../../../services/voterCandidate/loginService';

const VerifyVote = () => {
    const [wallet, setWallet] = useState('');

    const [to, setTo] = useState('');
    const [party, setParty] = useState('');
    const [constituency, setConstituency] = useState('');

    const handleSearch = async () => {
        try {
            const body = {
                transactionHash: wallet,
            };
            const res = await verifyVote(body);
            setTo(res.data.candidateName);
            setParty(res.data.party);
            setConstituency(res.data.constituency);
        } catch (error) {
            toast.error("Your vote doesn't exist, if you have casted, try again later!");
        }
    };

    return (
        <div>
            <div className="flex justify-between rounded-tl-3xl rounded-br-3xl m-[0.5rem] p-[1rem] text-themePurple text-[2.25rem] font-[500] bg-white">
                <h1>Verify Vote</h1>
                <div className="flex gap-4">
                    <TextField onChange={(e) => setWallet(e.target.value)} placeholder="Enter your code..." />
                    <button className="px-4 text-base text-white bg-themePurple" onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </div>
            <div className="bg-white flex flex-col gap-4 m-2 p-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Casted To</label>
                    <TextField disabled value={to} />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Party Name</label>
                    <TextField disabled value={party} />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="">Constituency</label>
                    <TextField disabled value={constituency} />
                </div>
            </div>
        </div>
    );
};

export default VerifyVote;
