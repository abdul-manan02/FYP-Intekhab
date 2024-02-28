import React, { useEffect, useRef, useState } from 'react';
import { TextField } from '@mui/material';

const VerifyVote = () => {
    const [wallet, setWallet] = useState('');

    const handleSearch = () => {
        console.log(wallet);
    };

    return (
        <div>
            <div className="flex justify-between rounded-tl-3xl rounded-br-3xl m-[0.5rem] p-[1rem] text-themePurple text-[2.25rem] font-[500] bg-white">
                <h1>Verify Vote</h1>
                <div className="flex gap-4">
                    <TextField onChange={(e) => setWallet(e.target.value)} placeholder="Enter wallet address" />
                    <button className="px-4 text-base text-white bg-themePurple" onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerifyVote;
