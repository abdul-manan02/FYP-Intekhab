import { FileUploader } from 'react-drag-drop-files';
import { useState } from 'react';

import toast from 'react-hot-toast';
import { CircularProgress } from '@mui/material';
import { ADMIN_BASE_URL } from '../../../util/constants';

const CandidateWindow = () => {
    const fileTypes = ['PDF'];
    const [isLoading, setIsLoading] = useState(false);

    const voter = JSON.parse(localStorage.getItem('voter-candidate'));

    const [file, setFile] = useState(null);

    const handleChange = (file) => {
        setFile(file);
    };

    const handleApply = async () => {
        try {
            setIsLoading(true);

            const formData = new FormData();
            formData.append('documents', file);
            // formData.append('partyId', selectedParty);
            formData.append('accountId', voter.account._id);

            const requestOptions = {
                method: 'POST',
                body: formData,
            };

            const response = await fetch(`${ADMIN_BASE_URL}/api/v1/admin/candidateApproval`, requestOptions);
            const data = await response.json();

            setIsLoading(false);

            toast.success('Application successful and is under review by the party!');
        } catch (error) {
            setIsLoading(false);
            toast.error('Error applying to join a party');
        }
    };

    return (
        <div>
            <h1 className="rounded-tl-3xl rounded-br-3xl m-[0.5rem] p-[1rem] text-themePurple text-[2.25rem] font-[500] bg-white">Candidate</h1>

            <h1 className="m-[0.5rem] p-[1rem] text-2xl text-themePurple font-semibold">Apply to become a Candidate</h1>
            {voter && voter.account.isCandidate === false ? (
                <div>
                    <div className="flex flex-col items-center justify-center gap-4">
                        <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
                    </div>
                    <div className="flex items-end justify-end p-[1rem] m-[0.5rem]">
                        <button
                            onClick={handleApply}
                            disabled={isLoading}
                            className={`${
                                isLoading ? 'cursor-not-allowed opacity-70' : ''
                            } p-4 mt-8 text-lg font-bold text-white rounded-md bg-themePurple`}
                        >
                            {isLoading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Apply'}
                        </button>
                    </div>
                </div>
            ) : (
                <h1 className='text-lg text-center'>
                    Your account has been granted candidate access, visit <span className="font-bold">"Party"</span> on the left bar
                </h1>
            )}
        </div>
    );
};

export default CandidateWindow;
