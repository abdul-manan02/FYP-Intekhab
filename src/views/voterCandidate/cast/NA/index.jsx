import React, { useEffect, useState } from 'react';
import CandidateCardVote from '../components/CandidateCardVoter';
import { getCandidatesForVoter } from '../../../../services/voterCandidate/electionService';
import { getPartyById } from '../../../../services/party/getAllParties';

const NA = ({ NAdata, castVoteFunc }) => {
    const voter = JSON.parse(localStorage.getItem('voter-candidate'));
    const [candidates, setCandidates] = useState(null);
    const [constituencyData, setConstituencyData] = useState(null);

    const fetchCandidates = async () => {
        const data = {
            electionId: NAdata && NAdata[0]._id,
            token: voter.token,
        };
        const res = await getCandidatesForVoter(voter.account._id, data);

        for (const constituencyId of Object.keys(res.candidatesForConstituencies)) {
            const candidateData = res.candidatesForConstituencies[constituencyId].candidates;
            const constituency = res.candidatesForConstituencies[constituencyId].constituencyData;
            setConstituencyData(constituency);

            for (const candidate of candidateData) {
                const party = await getParty(candidate.party);
                candidate.partyData = party.party;
            }

            setCandidates(candidateData);
        }
    };

    const getParty = async (id) => {
        const res = await getPartyById(id, voter.token);
        return res;
    };

    useEffect(() => {
        if (NAdata && NAdata[0]._id) {
            fetchCandidates();
        }
    }, [NAdata]);

    return (
        <div className="p-4 m-2">
            {NAdata &&
                candidates &&
                constituencyData &&
                candidates.map((candidate) => {
                    return (
                        <div className="grid grid-cols-1 gap-2 m-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            <CandidateCardVote castVoteFunc={castVoteFunc} key={candidate._id} data={candidate} constituency={constituencyData} />;
                        </div>
                    );
                })}
        </div>
    );
};

export default NA;
