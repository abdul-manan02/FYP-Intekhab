import NA from './NA';
import PP from './PP';
import { useEffect, useState } from 'react';
import MyTime from './components/Timer';
import { getElectionForVoterStarted } from '../../../services/voterCandidate/electionService';
import toast from 'react-hot-toast';

const CastVote = () => {
    const voter = JSON.parse(localStorage.getItem('voter-candidate'));
    const [choice, setChoice] = useState('NA');

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

            {choice === 'NA' ? <NA NAdata={general} /> : <PP PPdata={provincial} />}
        </div>
    );
};

export default CastVote;
