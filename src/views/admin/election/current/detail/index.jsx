import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { candidateRequestAtom } from '../../../../store/admin';
import { useAtom } from 'jotai';

const CurrentElectionDetail = ({ opened, setOpened }) => {
    const [selectedCandidateRequest] = useAtom(candidateRequestAtom);

    const handleClose = () => {
        setOpened(false);
    };

    // const handleAccept = async () => {
    //     try {
    //         const requestBody = {
    //             name: selectedPartyRequest.name,
    //             status: 'Accepted',
    //         };
    //         const response = await acceptRequest(selectedPartyRequest._id, requestBody);
    //         console.log(response);
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // };

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

    return (
        <Dialog open={opened} onClose={handleClose}>
            <DialogTitle>Candidate approval request</DialogTitle>
            <DialogContent className="w-[30rem]">
                <p className="font-bold">Candidate Id:</p>
                <p>{selectedCandidateRequest.accountId}</p>
                <p className="font-bold">Request status:</p>
                <p>{selectedCandidateRequest.status}</p>
                <p className="font-bold">Submit Time</p>
                <p>{convertToReadableTime(selectedCandidateRequest.submitTime)}</p>
                <p className="font-bold">Document</p>
                <p>{selectedCandidateRequest.proof}</p>
            </DialogContent>
            <DialogActions style={{ paddingTop: '5em' }}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Approve</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CurrentElectionDetail;
