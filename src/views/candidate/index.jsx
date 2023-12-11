import { DashNav } from '../../components/DashNav';
import { BsPersonFillCheck } from 'react-icons/bs';
import { FaPeopleGroup } from 'react-icons/fa6';
import { BsClipboard2CheckFill } from 'react-icons/bs';
import { IoPerson } from 'react-icons/io5';
import logo from '../../assets/icons/logo.png';
import { useState } from 'react';

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
                                setChoice('contest');
                            }}
                            className={`flex items-center gap-2 text-lg py-7 pl-11 w-full transition delay-75 hover:bg-hoverPurple ${
                                choice === 'contest' ? 'bg-hoverPurple' : null
                            }`}
                        >
                            <p>
                                <BsPersonFillCheck />
                            </p>
                            <p>Contest</p>
                        </button>
                        <button
                            onClick={() => {
                                setChoice('party');
                            }}
                            className={`flex items-center gap-2 text-lg py-7 pl-11 w-full transition delay-75 hover:bg-hoverPurple ${
                                choice === 'contest' ? 'bg-hoverPurple' : null
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
                                choice === 'contest' ? 'bg-hoverPurple' : null
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
                                choice === 'contest' ? 'bg-hoverPurple' : null
                            }`}
                        >
                            <p>
                                <IoPerson />
                            </p>
                            <p>Profile</p>
                        </button>
                    </div>
                </div>

                <div className="w-full h-screen bg-themeGray">
                    {choice === 'contest' ? <div className="ml-[20rem]">{/* <CandidateEligibility /> */}</div> : null}
                    {choice === 'party' ? <div className="ml-[20rem]">{/* <ManageMembers /> */}</div> : null}
                    {choice === 'result' ? <div className="ml-[20rem]">{/* <Results /> */}</div> : null}
                    {choice === 'profile' ? <div className="ml-[20rem]">{/* <Profile /> */}</div> : null}
                </div>
            </div>
        </div>
    );
};

export default CandidateDashboard;
