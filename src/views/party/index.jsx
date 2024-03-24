import { DashNav } from '../../components/DashNav';
import employee from '../../assets/icons/employee.png';
import checklist from '../../assets/icons/checklist.png';
import team from '../../assets/icons/team.png';
import user from '../../assets/icons/user.png';
import { useState } from 'react';
import Profile from './profile';
import CandidateEligibility from './eligibility';
import Results from '../result';
import ManageMembers from './member';
import logo from '../../assets/icons/logo.png';
import ActiveMembers from './active';

const PartyDashboard = () => {
    const [choice, setChoice] = useState('candidateEligibility');
    const party = JSON.parse(localStorage.getItem('partyToken'));

    return (
        <div>
            <DashNav role={'party'} />
            <div className="w-[100%] flex relative">
                <div className="w-[20rem] h-screen fixed top-0 bg-white">
                    <p className=" text-themePurple text-[2.25rem] font-[500] flex gap-2 ml-8 mt-8">
                        <img src={logo} alt="" /> Entekhaab
                    </p>
                    <div className='flex items-center justify-center mt-5'>
                        <img src={party.party.logo} height={60} width={60} alt="Party Image" />
                    </div>
                    <div className="flex flex-col items-center pt-[5rem] ">
                        <button
                            onClick={() => {
                                setChoice('candidateEligibility');
                            }}
                            className={`flex gap-2 text-[1.125rem] py-[1.62rem] justify-center w-full transition delay-75 hover:bg-hoverPurple ${
                                choice === 'candidateEligibility' ? 'bg-hoverPurple' : null
                            }`}
                        >
                            <img src={employee} alt="" /> Candidate
                        </button>
                        <button
                            onClick={() => {
                                setChoice('manageMembers');
                            }}
                            className={`flex gap-2 text-[1.125rem] py-[1.62rem] justify-center w-full transition delay-75 hover:bg-hoverPurple ${
                                choice === 'manageMembers' ? 'bg-hoverPurple' : null
                            }`}
                        >
                            <img src={team} alt="" /> Manage Members
                        </button>
                        <button
                            onClick={() => {
                                setChoice('activeMembers');
                            }}
                            className={`flex gap-2 text-[1.125rem] py-[1.62rem] justify-center w-full transition delay-75 hover:bg-hoverPurple ${
                                choice === 'activeMembers' ? 'bg-hoverPurple' : null
                            }`}
                        >
                            <img src={team} alt="" /> Active Members
                        </button>
                        <button
                            onClick={() => {
                                setChoice('results');
                            }}
                            className={`flex gap-2 text-[1.125rem] py-[1.62rem] justify-center w-full transition delay-75 hover:bg-hoverPurple ${
                                choice === 'results' ? 'bg-hoverPurple' : null
                            }`}
                        >
                            <img src={checklist} alt="" /> Results
                        </button>
                        <button
                            onClick={() => {
                                setChoice('profile');
                            }}
                            className={`flex gap-2 text-[1.125rem] py-[1.62rem] justify-center w-full transition delay-75 hover:bg-hoverPurple ${
                                choice === 'profile' ? 'bg-hoverPurple' : null
                            }`}
                        >
                            <img src={user} alt="" /> Profile
                        </button>
                    </div>
                </div>

                <div className="w-full h-screen bg-themeGray">
                    {choice === 'candidateEligibility' ? (
                        <div className="ml-[20rem]">
                            <CandidateEligibility />
                        </div>
                    ) : null}
                    {choice === 'manageMembers' ? (
                        <div className="ml-[20rem]">
                            <ManageMembers />
                        </div>
                    ) : null}
                    {choice === 'activeMembers' ? (
                        <div className="ml-[20rem]">
                            <ActiveMembers />
                        </div>
                    ) : null}
                    {choice === 'results' ? (
                        <div className="ml-[20rem]">
                            <Results />
                        </div>
                    ) : null}
                    {choice === 'profile' ? (
                        <div className="ml-[20rem]">
                            <Profile />
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default PartyDashboard;
