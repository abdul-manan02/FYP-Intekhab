import React, { useEffect, useState } from 'react';
import { getVoterCandidateById } from '../../../services/voterCandidate/getVoterCandidate';
import { FileUploader } from 'react-drag-drop-files';
import { TextField } from '@mui/material';
import toast from 'react-hot-toast';
import { changeContituency } from '../../../services/admin/electionService';

const Profile = () => {
    const voter = JSON.parse(localStorage.getItem('voter-candidate'));
    const [doc, setDoc] = useState(null);
    const fileTypePDF = ['PDF'];

    const [voterData, setVoterData] = useState(null);

    const handleDocChange = (file) => {
        setDoc(file);
    };

    const fetchUser = async () => {
        const res = await getVoterCandidateById(voter.account._id, voter.token);
        setVoterData(res);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const convertToReadableTime = (submitTime) => {
        const date = new Date(submitTime);

        // Options for formatting the date and time
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };

        // Format the date and time
        return date.toLocaleString(undefined, options);
    };

    const formatAddress = (data) => {
        const address = `${data.street} ${data.house}
            ${data.area} ${data.city}
            ${data.province}`;

        // Remove extra whitespaces and replace with a single whitespace
        const formattedAddress = address.trim().replace(/\s+/g, ' ');

        return formattedAddress.toString();
    };

    const [changedAddress, setChangedAddress] = useState('');

    const handleRequest = async () => {
        const formData = new FormData();
        formData.append('accountId', voterData._id);
        formData.append('changeTo', changedAddress);
        formData.append('proof', doc);

        const baseURL = import.meta.env.VITE_ADMIN_SERVICE;

        const requestOptions = {
            method: 'POST',
            body: formData,
        };

        try {
            const url = `${baseURL}/api/v1/admin/constituencyChangeRequest`;
            const response = await fetch(url, requestOptions);
            const data = await response.json();
            toast.success('Applied Successfully, in review by admin');
        } catch (error) {
            toast.error('Failed to submit request, try again!');
        }
    };

    return (
        <div>
            <h1 className="rounded-tl-3xl rounded-br-3xl m-[0.5rem] p-[1rem] text-themePurple text-[2.25rem] font-[500] bg-white">Profile</h1>
            {voterData && (
                <div className="flex flex-col gap-4 p-4 m-2 bg-white">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="" className="font-bold">
                            Name
                        </label>
                        <TextField fullWidth disabled value={voterData.CitizenData.name} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="" className="font-bold">
                            Cnic
                        </label>
                        <TextField fullWidth disabled value={voterData.CitizenData.cnic} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="" className="font-bold">
                            Date of birth
                        </label>
                        <TextField fullWidth disabled value={convertToReadableTime(voterData.CitizenData.dateOfBirth)} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="" className="font-bold">
                            Maritial Status
                        </label>
                        <TextField fullWidth disabled value={voterData.CitizenData.maritalStatus} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="" className="font-bold">
                            Image
                        </label>
                        <img src={voterData.CitizenData.images[0].url} alt="Voter Image" className="w-[30rem] rounded-3xl" />
                    </div>
                    {voterData.votingAddress === 'Permanent' && voterData.CitizenData ? (
                        <div className="flex flex-col gap-1">
                            <label htmlFor="" className="font-bold">
                                Permanent Address
                            </label>
                            <TextField fullWidth disabled value={formatAddress(voterData.CitizenData.permanentAddress)} />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-1">
                            <label htmlFor="" className="font-bold">
                                Temporary Address
                            </label>
                            <TextField fullWidth disabled value={formatAddress(voterData.CitizenData.temporaryAddress)} />
                        </div>
                    )}

                    <div className="flex flex-col gap-4">
                        <label htmlFor="" className="font-bold">
                            Change Constituency
                        </label>
                        <TextField
                            placeholder="Enter your address... (Permanent or Temporary)"
                            value={changedAddress}
                            onChange={(e) => setChangedAddress(e.target.value)}
                        />
                        <FileUploader handleChange={handleDocChange} name="file" types={fileTypePDF} />
                    </div>
                    <div className="flex items-end justify-end">
                        <button onClick={handleRequest} className="w-1/6 px-4 py-2 text-white bg-themePurple rounded-xl">
                            Submit Request
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
