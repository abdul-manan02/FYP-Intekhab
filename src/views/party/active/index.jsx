import React, { useEffect, useState } from 'react';
import { getAllMembers } from '../../../services/party/memberService';
import toast from 'react-hot-toast';
import CandidateCard from '../../voterCandidate/cast/components/CandidateCard';
import { CircularProgress } from '@mui/material';

const ActiveMembers = () => {
    const party = JSON.parse(localStorage.getItem('partyToken'));
    const [loading, setLoading] = useState(false);
    const [members, setMembers] = useState([]);

    const fetchMembers = async () => {
        setLoading(true);
        try {
            const res = await getAllMembers(party.party._id, party.token);
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

    return (
        <div>
            <h1 className="rounded-tl-3xl rounded-br-3xl m-[0.5rem] p-[1rem] text-themePurple text-[2.25rem] font-[500] bg-white">Active Members</h1>
            {loading && (
                <div className="flex items-center justify-center mt-5 text-themePurple">
                    <CircularProgress size={40} color='inherit'/>
                </div>
            )}
            {!loading && members.length > 0 ? (
                <div className="grid grid-cols-1 m-2 gap-x-5 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <CandidateCard members={members} />
                    <CandidateCard members={members} />
                    <CandidateCard members={members} />
                    <CandidateCard members={members} />
                    <CandidateCard members={members} />
                </div>
            ) : !loading && members.length === 0 ? (
                <p>There's no members in the Party</p>
            ) : null}
        </div>
    );
};

export default ActiveMembers;
