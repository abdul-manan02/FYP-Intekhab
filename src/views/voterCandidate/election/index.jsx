import React from 'react';
import { getElectionForVoter } from '../../../services/voterCandidate/electionService';
import { useEffect, useState } from 'react';
import { getPartyById } from '../../../services/party/getAllParties';
import CandidateElectionParticipationDetail from './detail';

const ElectionVoter = () => {
    const voter = JSON.parse(localStorage.getItem('voter-candidate'));
    const [electionData, setElectionData] = useState(null);
    const [partyData, setPartyData] = useState(null);
    const fetchElections = async () => {
        try {
            const res = await getElectionForVoter(voter.account._id, voter.token);
            setElectionData(res);
        } catch (error) {
            toast.error('Failed to fetch election information');
        }
    };

    useEffect(() => {
        if (voter.account) {
            fetchElections();
        }
    }, []);

    const fetchParty = async () => {
        try {
            const res = await getPartyById(voter.account.party, voter.token);
            setPartyData(res.party);
        } catch (error) {
            toast.error('Failed to fetch party information');
        }
    };

    useEffect(() => {
        if (voter.account.party) {
            fetchParty();
        }
    }, []);

    return (
        <div>
            <h1 className="rounded-tl-3xl rounded-br-3xl m-[0.5rem] p-[1rem] text-themePurple text-[2.25rem] font-[500] bg-white">Election</h1>
            {voter.account.isCandidate ? (
                voter.account.party ? (
                    <p className='p-4 m-2 text-xl font-bold'>You will be applying in elections as a member of {partyData.name}</p>
                ) : (
                    <p>You will be applying as an independent candidate in the elections</p>
                )
            ) : (
                <p>Candidate access level required for this window</p>
            )}
        </div>
    );
};

export default ElectionVoter;
