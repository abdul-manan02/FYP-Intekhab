import React from 'react';
import CandidateCardVote from '../components/CandidateCardVoter';

const NA = ({ NAdata, castVoteFunc }) => {
    return (
        <div className="p-4 m-2">
            <button onClick={() => console.log(NAdata)}>test</button>
            <div className="grid grid-cols-1 gap-2 m-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {NAdata &&
                    NAdata.map((election) => {
                        return (
                            <div key={election.electionType}>
                                <h1>{election.electionType}</h1>
                                {election.candidates.map((candidate) => {
                                    return <CandidateCardVote castVoteFunc={castVoteFunc} key={candidate.id} data={candidate} />;
                                })}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default NA;
