import React, { useEffect, useState } from 'react';
import { getAllMembers } from '../../../services/party/memberService';
import toast from 'react-hot-toast';
import CandidateCard from '../../voterCandidate/cast/components/CandidateCard';
import { CircularProgress } from '@mui/material';
import { useAtom } from 'jotai';
import { selectedMemberAtom } from '../../../store/admin';
import MemberDetail from './detail';

const ActiveMembers = () => {
    const party = JSON.parse(localStorage.getItem('partyToken'));
    const [loading, setLoading] = useState(false);
    const [members, setMembers] = useState([]);
    const [, setSelectedMember] = useAtom(selectedMemberAtom);
    const [opened, setOpened] = useState(false);

    const fetchMembers = async () => {
        setLoading(true);
        try {
            const res = await getAllMembers(party.party._id, party.token);
            console.log('res', res);
            setMembers(res);
        } catch (error) {
            toast.error('Failed to fetch party members');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const func = (member) => {
        setSelectedMember(member);
    };

    return (
        <div>
            {members && members.length > 0 ? <MemberDetail opened={opened} setOpened={setOpened} /> : null}
            <h1 className="rounded-tl-3xl rounded-br-3xl m-[0.5rem] p-[1rem] text-themePurple text-[2.25rem] font-[500] bg-white">Active Members</h1>
            {loading && (
                <div className="flex items-center justify-center mt-5 text-themePurple">
                    <CircularProgress size={40} color="inherit" />
                </div>
            )}
            {!loading && members.length > 0 ? (
                <div className="grid grid-cols-1 gap-2 m-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {members && members.map((member, index) => <CandidateCard key={index} func={func} data={member} setOpened={setOpened} />)}
                </div>
            ) : !loading && members.length === 0 ? (
                <p>There's no members in the Party</p>
            ) : null}
        </div>
    );
};

export default ActiveMembers;
