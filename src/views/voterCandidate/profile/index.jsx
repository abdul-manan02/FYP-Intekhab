import React, { useEffect } from 'react';
import { getVoterCandidateById } from '../../../services/voterCandidate/getVoterCandidate';
const Profile = () => {
    const voter = JSON.parse(localStorage.getItem('voter-candidate'));
    const fetchUser = async () => {
        const res = await getVoterCandidateById(voter.account._id, voter.token);
        console.log(res);
    };

    useEffect(() => {
        fetchUser();
    }, [voter]);

    return (
        <div>
            <h1 className="rounded-tl-3xl rounded-br-3xl m-[0.5rem] p-[1rem] text-themePurple text-[2.25rem] font-[500] bg-white">Profile</h1>
        </div>
    );
};

export default Profile;
