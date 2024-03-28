import NA from './NA';
import PP from './PP';
import { useEffect, useState } from 'react';
import MyTime from './components/Timer';
import { getElectionForVoterStarted } from '../../../services/voterCandidate/electionService';
import toast from 'react-hot-toast';
import { castVote } from '../../../services/voterCandidate/electionService';
import { voteDataAtom } from '../../../store/voter-candidate';
import { useAtom } from 'jotai';
import { getVoterCandidateById } from '../../../services/voterCandidate/getVoterCandidate';

const CastVote = () => {
    const voter = JSON.parse(localStorage.getItem('voter-candidate'));
    const [choice, setChoice] = useState('NA');
    const [voteData] = useAtom(voteDataAtom);

    const handleChoice = (value) => {
        setChoice(value);
    };

    const [general, setGeneral] = useState(null);
    const [provincial, setProvincial] = useState(null);

    const fetchElections = async () => {
        try {
            const res = await getElectionForVoterStarted(voter.account._id, voter.token);
            console.log('elect', res);
            prepareData(res);
        } catch (error) {
            toast.error('Failed to fetch election information');
        }
    };

    const prepareData = (res) => {
        let NA = [];
        let PP = [];

        res.map((election) => {
            if (election.electionType === 'General Elections') {
                NA.push(election);
            } else if (election.electionType === 'By Elections') {
                PP.push(election);
            }
        });

        setGeneral(NA);
        setProvincial(PP);
    };

    useEffect(() => {
        if (voter.account) {
            fetchElections();
        }
    }, []);

    function calculateAge(dateOfBirth) {
        const dob = new Date(dateOfBirth);
        const now = new Date();

        // Calculate the difference in years
        let age = now.getFullYear() - dob.getFullYear();

        // Check if the birthday has occurred this year
        const hasBirthdayOccurred = now.getMonth() > dob.getMonth() || (now.getMonth() === dob.getMonth() && now.getDate() >= dob.getDate());

        // If the birthday hasn't occurred yet this year, decrement age
        if (!hasBirthdayOccurred) {
            age--;
        }

        return age.toString();
    }

    const castVoteFunc = async (candidate, constituency) => {
        const voterData = await getVoterCandidateById(voter.account._id, voter.token);
        // console.log(calculateAge(voterData.CitizenData.dateOfBirth))
        try {
            const data = {
                party: candidate.partyData.name,
                candidateName: candidate.CitizenData.name,
                age: calculateAge(voterData.CitizenData.dateOfBirth),
                maritalStatus: voterData.CitizenData.maritalStatus,
                gender: voterData.CitizenData.gender,
                dob: voterData.CitizenData.dateOfBirth.toString(),
                constituency: constituency.name,
                voterId: voterData._id,
                electionId: general[0]._id,
            };
            const res = await castVote(voter.account._id, data);
            console.log('casted', res);
        } catch (error) {
            toast.error('Failed to cast vote, visit verify vote if you have already casted your vote');
        }
    };

    return (
        <div>
            <h1 className="rounded-tl-3xl rounded-br-3xl m-[0.5rem] p-[1rem] text-themePurple text-[2.25rem] font-[500] bg-white">Cast Vote</h1>
            <MyTime />
            <div className="flex items-center w-2/5 mx-auto mt-8 bg-themePurple rounded-xl">
                <button
                    onClick={() => handleChoice('NA')}
                    className={`w-1/2 py-3  transition delay-75 hover:bg-white hover:text-themePurple rounded-tl-xl rounded-bl-xl ${
                        choice === 'NA' ? 'bg-white text-themePurple' : 'text-white'
                    }`}
                >
                    NA
                </button>
                <button
                    onClick={() => handleChoice('PP')}
                    className={`w-1/2 py-3  transition delay-75 hover:bg-white hover:text-themePurple ${
                        choice === 'PP' ? 'bg-white text-themePurple' : 'text-white'
                    }`}
                >
                    PP
                </button>
            </div>

            {choice === 'NA' ? <NA NAdata={general} castVoteFunc={castVoteFunc} /> : <PP PPdata={provincial} />}
        </div>
    );
};

export default CastVote;
