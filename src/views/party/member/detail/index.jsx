import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { candidateRequestAtom } from '../../../../store/admin';
import { useAtom } from 'jotai';
import { memberRequestAtom } from '../../../../store/party';

const MemberRequestDetail = ({ opened, setOpened }) => {
    const [selectedMemberRequest] = useAtom(memberRequestAtom);

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

    const handleViewDocument = (doc) => {
        const url = `/party/dashboard/pdf/${selectedMemberRequest._id}`;

        localStorage.setItem('state', JSON.stringify(doc));

        // Open the URL in a new tab
        window.open(url, '_blank');
    };

    return (
        <Dialog open={opened} onClose={handleClose}>
            <DialogTitle>Candidate approval request</DialogTitle>
            <button onClick={() => console.log(selectedMemberRequest)}>test</button>
            <DialogContent className="w-[30rem]">
                <p className="font-bold">Candidate Id:</p>
                <p>{selectedMemberRequest.memberId}</p>
                <p className="font-bold">Request status:</p>
                <p>{selectedMemberRequest.status}</p>
                <p className="font-bold">Submit Time</p>
                <p>{convertToReadableTime(selectedMemberRequest.submitTime)}</p>
                <p className="font-bold">Document</p>
                <Button
                    variant="contained"
                    onClick={() => {
                        handleViewDocument(selectedMemberRequest?.proof);
                    }}
                >
                    View Document
                </Button>
            </DialogContent>
            <DialogActions style={{ paddingTop: '5em' }}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Approve</Button>
            </DialogActions>
        </Dialog>
    );
};

export default MemberRequestDetail;
