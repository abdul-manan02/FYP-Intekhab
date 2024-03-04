import React from 'react';
import CandidateCard from '../components/CandidateCard';

const NA = () => {
    const ar = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
        <div className="p-4 m-2">
            <div className="flex flex-wrap gap-4">
                {ar.map((item) => {
                    return <CandidateCard key={item} />;
                })}
            </div>
        </div>
    );
};

export default NA;
