import React, { useEffect, useState } from 'react';
import PartyCard from './components/PartyCard';
import { getAllParties } from '../../../services/party/getAllParties';

const Party = () => {
    const voter = JSON.parse(localStorage.getItem('voter-candidate'));

    const [parties, setParties] = useState([]);

    const fetchParties = async () => {
        try {
            const res = await getAllParties();
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchParties();
    }, []);

    const ar = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
        <div>
            <h1 className="rounded-tl-3xl rounded-br-3xl m-[0.5rem] p-[1rem] text-themePurple text-[2.25rem] font-[500] bg-white">Party</h1>
            {voter.account.isCandidate ? (
                <div className="p-4 m-2">
                    <div className="flex flex-wrap gap-4">
                        {ar.map((item) => {
                            return <PartyCard key={item} />;
                        })}
                    </div>
                </div>
            ) : (
                <h1 className="text-base text-center">
                    You are not the member of a party yet, <span className="text-lg font-bold cursor-pointer">Visit "Candidate" on the left bar</span>
                </h1>
            )}
        </div>
    );
};

export default Party;

{
    /* <div className="flex flex-col items-center justify-center w-full">
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
                        </div> */
}
