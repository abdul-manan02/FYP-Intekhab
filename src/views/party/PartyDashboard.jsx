import { DashNav } from '../../components/DashNav';
import employee from '../../assets/icons/employee.png';
import checklist from '../../assets/icons/checklist.png';
import team from '../../assets/icons/team.png';
import user from '../../assets/icons/user.png';
import { useState } from 'react';
import { CandidateEligibility } from './eligibility/CandidateEligibility';
import { ManageMembers } from './member/ManageMembers';
import { Results } from './result/Results';
import { Profile } from './profile/Profile';

export const PartyDashboard = () => {
    const [choice, setChoice] = useState('');

    return (
        <div>
            <DashNav />
            <div className="w-[100%] flex">
                <div className="w-[20%]  h-screen ">
                    <div className="flex flex-col items-center pt-[5rem]">
                        <button
                            onClick={() => {
                                setChoice('candidateEligibility');
                            }}
                            className="flex gap-2 text-[1.125rem] py-[1.62rem] justify-center  w-full transition delay-75 hover:bg-hoverPurple"
                        >
                            <img src={employee} alt="" /> Candidate Eligibility
                        </button>
                        <button
                            onClick={() => {
                                setChoice('manageMembers');
                            }}
                            className="flex gap-2 text-[1.125rem] py-[1.62rem] justify-center w-full transition delay-75 hover:bg-hoverPurple"
                        >
                            <img src={team} alt="" /> Manage Members
                        </button>
                        <button
                            onClick={() => {
                                setChoice('results');
                            }}
                            className="flex gap-2 text-[1.125rem] py-[1.62rem] justify-center w-full transition delay-75 hover:bg-hoverPurple"
                        >
                            <img src={checklist} alt="" /> Results
                        </button>
                        <button
                            onClick={() => {
                                setChoice('profile');
                            }}
                            className="flex gap-2 text-[1.125rem] py-[1.62rem] justify-center w-full transition delay-75 hover:bg-hoverPurple"
                        >
                            <img src={user} alt="" /> Profile
                        </button>
                    </div>
                </div>

                <div className="w-[80%] h-screen bg-themeGray">
                    {choice === 'candidateEligibility' ? <CandidateEligibility /> : null}
                    {choice === 'manageMembers' ? <ManageMembers /> : null}
                    {choice === 'results' ? <Results /> : null}
                    {choice === 'profile' ? <Profile /> : null}
                </div>
            </div>
        </div>
    );
};
