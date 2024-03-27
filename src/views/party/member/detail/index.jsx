import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useAtom } from 'jotai';
import { memberRequestAtom } from '../../../../store/party';
import { getVoterCandidateById } from '../../../../services/voterCandidate/getVoterCandidate';
import toast from 'react-hot-toast';
import { CircularProgress } from '@mui/material';
import { updatePartyApproval } from '../../../../services/party/memberService';

const MemberRequestDetail = ({ opened, setOpened }) => {
    const party = JSON.parse(localStorage.getItem('partyToken'));
    const [selectedMemberRequest] = useAtom(memberRequestAtom);
    const [voterData, setVoterData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchVoter = async () => {
        try {
            setLoading(true);
            const res = await getVoterCandidateById(selectedMemberRequest.memberId, party.token);
            console.log('res', res);
            setVoterData(res);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error('Failed to fetch member information');
        }
    };

    useEffect(() => {
        if (opened) {
            fetchVoter();
        }
    }, [selectedMemberRequest]);

    const handleClose = () => {
        setOpened(false);
    };

    const handleAccept = async (status) => {
        try {
            const requestBody = {
                status: status,
            };

            const response = await updatePartyApproval(party.token, requestBody, selectedMemberRequest._id);
            console.log(response);
            toast.success('Member request accepted successfully!');
        } catch (error) {
            toast.error('Failed to accept member request');
        }
    };

    const convertToReadableTime = (submitTime) => {
        const date = new Date(submitTime);

        // Options for formatting the date and time
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            timeZoneName: 'short',
        };

        // Format the date and time
        return date.toLocaleString(undefined, options);
    };

    const handleViewDocument = (doc) => {
        const url = `/party/dashboard/pdf/${selectedMemberRequest._id}`;

        localStorage.setItem('state', JSON.stringify(doc));

        // Open the URL in a new tab
        window.open(url, '_blank');
    };

    return (
        <Dialog open={opened} onClose={handleClose}>
            {voterData ? (
                <>
                    <DialogTitle>Candidate approval request</DialogTitle>
                    <DialogContent className="w-[30rem]">
                        <p className="mt-4 font-bold">Candidate Id:</p>
                        <p>{selectedMemberRequest.memberId}</p>
                        <p className="mt-4 font-bold">Request status:</p>
                        <p>{selectedMemberRequest.status}</p>
                        <p className="mt-4 font-bold">Submit Time</p>
                        <p>{convertToReadableTime(selectedMemberRequest.submitTime)}</p>
                        <p className="mt-4 font-bold">Candidate Picture</p>
                        <img src={voterData.CitizenData.images[0].url} alt="Candidate Picture" className="rounded-3xl " />
                        <p className="mt-4 font-bold">Document</p>
                        <Button
                            variant="contained"
                            onClick={() => {
                                handleViewDocument(selectedMemberRequest?.proof);
                            }}
                        >
                            View Document
                        </Button>
                    </DialogContent>
                    {selectedMemberRequest.status !== 'Accepted' && selectedMemberRequest.status !== 'Rejected' ? (
                        <DialogActions style={{ paddingTop: '2rem' }}>
                            <Button onClick={() => handleAccept('Rejected')} variant="outlined">
                                Reject
                            </Button>
                            <Button onClick={() => handleAccept('Accepted')} variant="contained">
                                Approve
                            </Button>
                        </DialogActions>
                    ) : null}
                </>
            ) : (
                <CircularProgress size={24} />
            )}
        </Dialog>
    );
};

export default MemberRequestDetail;
