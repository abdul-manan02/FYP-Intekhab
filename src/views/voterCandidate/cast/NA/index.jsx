import React, { useEffect, useState } from 'react';
import CandidateCardVote from '../components/CandidateCardVoter';
import { getCandidatesForVoter } from '../../../../services/voterCandidate/electionService';
import { getPartyById } from '../../../../services/party/getAllParties';
import { FaCopy } from 'react-icons/fa';
import toast from 'react-hot-toast';

const NA = ({ NAdata, castVoteFunc, castedData }) => {
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

    const handleCopyClick = () => {
        navigator.clipboard
            .writeText(castedData)
            .then(() => toast.success('Code copied to clipboard'))
            .catch((error) => console.error('Error copying text:', error));
    };

    return (
        <div className="p-4 m-2">
            {castedData ? (
                <div className="p-4 bg-white rounded-lg">
                    <h1 className="text-lg">
                        Your vote has been casted successfully!{' '}
                        <span className="text-xl text-red-400">
                            please save this code somewhere safe and do not lose it as you won't get it again.
                        </span>{' '}
                        Use this code to verify your vote
                    </h1>
                    <div className="flex items-center gap-3">
                        <p className="mt-4 text-xl text-blue-400">{castedData}</p>
                        <div className="mt-2 text-xl cursor-pointer" onClick={handleCopyClick}>
                            <FaCopy />
                        </div>
                    </div>
                </div>
            ) : (
                NAdata &&
                candidates &&
                constituencyData &&
                candidates.map((candidate) => (
                    <div className="grid grid-cols-1 gap-2 m-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" key={candidate._id}>
                        <CandidateCardVote castVoteFunc={castVoteFunc} data={candidate} constituency={constituencyData} />
                    </div>
                ))
            )}
        </div>
    );
};

export default NA;
