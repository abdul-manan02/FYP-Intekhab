import React from 'react';
import CandidateCardVote from '../components/CandidateCardVoter';

const PP = ({ PPdata }) => {
    return (
        <div className="p-4 m-2">
            <div className="grid grid-cols-1 gap-2 m-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {PPdata &&
                    PPdata.map((election) => {
                        return (
                            <div key={election.electionType}>
                                <h1>{election.electionType}</h1>
                                {election.candidates.map((candidate) => {
                                    return <CandidateCardVote key={candidate.id} data={candidate} />;
                                })}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default PP;
