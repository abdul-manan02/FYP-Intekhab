import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { partyRequestAtom } from '../../../../store/admin';
import { useAtom } from 'jotai';
import { acceptRequest } from '../../../../services/admin/partyService';

const PartyRequestDetail = ({ opened, setOpened }) => {
    const [selectedPartyRequest] = useAtom(partyRequestAtom);

    const handleClose = () => {
        setOpened(false);
    };

    const handleAccept = async (status) => {
        try {
            const requestBody = {
                name: selectedPartyRequest.name,
                status: status,
            };
            const response = await acceptRequest(selectedPartyRequest._id, requestBody);
            handleClose();
        } catch (error) {
            console.log(error.message);
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

    // const handleViewDocument = (doc) => {
    //     navigate(`/admin/dashboard/pdf/${selectedPartyRequest._id}`, { state: { docValue: doc } });
    // };

    const handleViewDocument = (doc) => {
        const url = `/admin/dashboard/pdf/${selectedPartyRequest._id}`;

        localStorage.setItem('state', JSON.stringify(doc));

        // Open the URL in a new tab
        window.open(url, '_blank');
    };

    return (
        <Dialog open={opened} onClose={handleClose}>
            <DialogTitle>Party approval request</DialogTitle>
            <DialogContent className="w-[30rem]">
                <p className="font-bold">Chairman CNIC:</p>
                <p>{selectedPartyRequest?.leaderCNIC}</p>
                <p className="font-bold">Party Name:</p>
                <p>{selectedPartyRequest?.name}</p>
                <p className="font-bold">Status:</p>
                <p>{selectedPartyRequest?.status}</p>
                <p className="font-bold">Submit Time</p>
                <p>{convertToReadableTime(selectedPartyRequest?.submitTime)}</p>
                <p className="font-bold">Document</p>
                <Button
                    variant="contained"
                    onClick={() => {
                        handleViewDocument(selectedPartyRequest?.proof);
                    }}
                >
                    View Document
                </Button>
            </DialogContent>
            {selectedPartyRequest.status !== 'Accepted' && selectedPartyRequest.status !== 'Rejected' ? (
                <DialogActions style={{ paddingTop: '5em' }}>
                    <Button onClick={() => handleAccept('Rejected')} variant="outlined">
                        Reject
                    </Button>
                    <Button onClick={() => handleAccept('Accepted')} variant="contained">
                        Approve
                    </Button>
                </DialogActions>
            ) : null}
        </Dialog>
    );
};

export default PartyRequestDetail;
