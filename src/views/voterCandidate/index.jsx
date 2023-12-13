import { DashNav } from '../../components/DashNav';
import { BsPersonFillCheck } from 'react-icons/bs';
import { FaPeopleGroup } from 'react-icons/fa6';
import { BsClipboard2CheckFill } from 'react-icons/bs';
import { IoPerson } from 'react-icons/io5';
import logo from '../../assets/icons/logo.png';
import { useState } from 'react';
import Results from '../result';
import { GiVote } from 'react-icons/gi';
import { FaVoteYea } from 'react-icons/fa';
import { MdContentPasteSearch } from 'react-icons/md';
import CandidateWindow from './candidate';
import CastVote from './cast';
import Party from './party';
import PastVotes from './past';
import Profile from './profile';
import VerifyVote from './verify';

const CandidateDashboard = () => {
    const [choice, setChoice] = useState('candidateEligibility');

    return (
        <div>
            <DashNav />
            <div className="w-[100%] flex relative">
                <div className="fixed top-0 h-screen bg-white w-80">
                    <p className=" text-themePurple text-[2.25rem] font-[500] flex gap-2 ml-8 mt-8">
                        <img src={logo} alt="" /> Entekhaab
                    </p>
                    <div className="flex flex-col items-center pt-[5rem] ">
                        <button
                            onClick={() => {
                                setChoice('vote');
                            }}
                            className={`flex items-center gap-2 text-lg py-7 pl-11 w-full transition delay-75 hover:bg-hoverPurple ${
                                choice === 'vote' ? 'bg-hoverPurple' : null
                            }`}
                        >
                            <p>
                                <GiVote />
                            </p>
                            <p>Cast Vote</p>
                        </button>
                        <button
                            onClick={() => {
                                setChoice('party');
                            }}
                            className={`flex items-center gap-2 text-lg py-7 pl-11 w-full transition delay-75 hover:bg-hoverPurple ${
                                choice === 'party' ? 'bg-hoverPurple' : null
                            }`}
                        >
                            <p>
                                <FaPeopleGroup />
                            </p>
                            <p>Party</p>
                        </button>
                        <button
                            onClick={() => {
                                setChoice('result');
                            }}
                            className={`flex items-center gap-2 text-lg py-7 pl-11 w-full transition delay-75 hover:bg-hoverPurple ${
                                choice === 'result' ? 'bg-hoverPurple' : null
                            }`}
                        >
                            <p>
                                <BsClipboard2CheckFill />
                            </p>
                            <p> Results</p>
                        </button>
                        <button
                            onClick={() => {
                                setChoice('profile');
                            }}
                            className={`flex items-center gap-2 text-lg py-7 pl-11 w-full transition delay-75 hover:bg-hoverPurple ${
                                choice === 'profile' ? 'bg-hoverPurple' : null
                            }`}
                        >
                            <p>
                                <IoPerson />
                            </p>
                            <p>Profile</p>
                        </button>
                        <button
                            onClick={() => {
                                setChoice('past');
                            }}
                            className={`flex items-center gap-2 text-lg py-7 pl-11 w-full transition delay-75 hover:bg-hoverPurple ${
                                choice === 'past' ? 'bg-hoverPurple' : null
                            }`}
                        >
                            <p>
                                <MdContentPasteSearch />
                            </p>
                            <p>Past Votes</p>
                        </button>

                        <button
                            onClick={() => {
                                setChoice('verify');
                            }}
                            className={`flex items-center gap-2 text-lg py-7 pl-11 w-full transition delay-75 hover:bg-hoverPurple ${
                                choice === 'verify' ? 'bg-hoverPurple' : null
                            }`}
                        >
                            <p>
                                <FaVoteYea />
                            </p>
                            <p>Verify Vote</p>
                        </button>

                        <button
                            onClick={() => {
                                setChoice('candidate');
                            }}
                            className={`flex items-center gap-2 text-lg py-7 pl-11 w-full transition delay-75 hover:bg-hoverPurple ${
                                choice === 'candidate' ? 'bg-hoverPurple' : null
                            }`}
                        >
                            <p>
                                <IoPerson />
                            </p>
                            <p>Candidate</p>
                        </button>
                    </div>
                </div>

                <div className="w-full h-screen bg-themeGray">
                    {choice === 'vote' ? (
                        <div className="ml-[20rem]">
                            <CastVote />
                        </div>
                    ) : null}
                    {choice === 'party' ? (
                        <div className="ml-[20rem]">
                            <Party />
                        </div>
                    ) : null}
                    {choice === 'result' ? (
                        <div className="ml-[20rem]">
                            <Results />
                        </div>
                    ) : null}
                    {choice === 'profile' ? (
                        <div className="ml-[20rem]">
                            <Profile />
                        </div>
                    ) : null}
                    {choice === 'past' ? (
                        <div className="ml-[20rem]">
                            <PastVotes />
                        </div>
                    ) : null}
                    {choice === 'verify' ? (
                        <div className="ml-[20rem]">
                            <VerifyVote />
                        </div>
                    ) : null}
                    {choice === 'candidate' ? (
                        <div className="ml-[20rem]">
                            <CandidateWindow />
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default CandidateDashboard;
