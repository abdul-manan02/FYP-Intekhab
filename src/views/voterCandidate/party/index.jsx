import React from 'react';
import PartyCard from './components/PartyCard';

const Party = () => {
    const ar = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
        <div>
            <h1 className="rounded-tl-3xl rounded-br-3xl m-[0.5rem] p-[1rem] text-themePurple text-[2.25rem] font-[500] bg-white">Party</h1>

            <div className="p-4 m-2">
                <div className="flex flex-wrap gap-4">
                    {ar.map((item) => {
                        return <PartyCard key={item} />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default Party;
