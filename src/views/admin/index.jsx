import { DashNav } from '../../components/DashNav';
import { BsPersonFillCheck } from 'react-icons/bs';
import { FaPeopleGroup } from 'react-icons/fa6';
import { BsClipboard2CheckFill } from 'react-icons/bs';
import { IoPerson } from 'react-icons/io5';
import logo from '../../assets/icons/logo.png';
import { useState } from 'react';
import ManageElection from './election';

const AdminDashboard = () => {
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
                                setChoice('party');
                            }}
                            className={`flex items-center gap-2 text-lg py-7 pl-11 w-full transition delay-75 hover:bg-hoverPurple ${
                                choice === 'party' ? 'bg-hoverPurple' : null
                            }`}
                        >
                            <p>
                                <BsPersonFillCheck />
                            </p>
                            <p>Party Approval</p>
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
                                <BsPersonFillCheck />
                            </p>
                            <p>Candidate Approval</p>
                        </button>
                        <button
                            onClick={() => {
                                setChoice('election');
                            }}
                            className={`flex items-center gap-2 text-lg py-7 pl-11 w-full transition delay-75 hover:bg-hoverPurple ${
                                choice === 'election' ? 'bg-hoverPurple' : null
                            }`}
                        >
                            <p>
                                <FaPeopleGroup />
                            </p>
                            <p>Manage Elections</p>
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
                                setChoice('constituency');
                            }}
                            className={`flex items-center gap-2 text-lg py-7 pl-11 w-full transition delay-75 hover:bg-hoverPurple ${
                                choice === 'constituency' ? 'bg-hoverPurple' : null
                            }`}
                        >
                            <p>
                                <IoPerson />
                            </p>
                            <p>Manage Constituency</p>
                        </button>
                    </div>
                </div>

                <div className="w-full h-screen bg-themeGray">
                    {choice === 'party' ? <div className="ml-[20rem]">{/* <CandidateEligibility /> */}</div> : null}
                    {choice === 'candidate' ? <div className="ml-[20rem]">{/* <ManageMembers /> */}</div> : null}
                    {choice === 'election' ? <div className="ml-[20rem]">{<ManageElection />}</div> : null}
                    {choice === 'result' ? <div className="ml-[20rem]">{/* <Profile /> */}</div> : null}
                    {choice === 'constituency' ? <div className="ml-[20rem]">{/* <Profile /> */}</div> : null}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
