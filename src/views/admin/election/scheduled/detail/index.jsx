import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useAtom } from 'jotai';
import { scheduledDetailAtom } from '../../../../../store/admin';
import { startElection } from '../../../../../services/admin/electionService';
import toast from 'react-hot-toast';

const ScheduledElectionDetail = ({ opened, setOpened }) => {
    const [selectionElectionDetail] = useAtom(scheduledDetailAtom);

    const handleClose = () => {
        setOpened(false);
    };

    const handleStart = async () => {
        try {
            const res = await startElection(selectionElectionDetail._id);
            console.log(res);
            handleClose();
        } catch (error) {
            toast.error('Failed to start election');
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

    return (
        <Dialog open={opened} onClose={handleClose}>
            <DialogTitle>Election details</DialogTitle>
            <DialogContent className="w-[30rem]">
                {selectionElectionDetail && (
                    <>
                        <p className="font-bold">Election type:</p>
                        <p>{selectionElectionDetail.electionType}</p>
                        <p className="font-bold">Constituencies:</p>
                        <div>
                            {selectionElectionDetail.constituencies && selectionElectionDetail.constituencies.length > 0
                                ? selectionElectionDetail.constituencies.map((item, index) => <p key={index}>{item}</p>)
                                : null}
                        </div>
                        <p className="font-bold">Start time:</p>
                        <p>{convertToReadableTime(selectionElectionDetail.electionTime)}</p>
                        <p className="font-bold">Candidates:</p>
                        <div>
                            {selectionElectionDetail.candidates && selectionElectionDetail.candidates.length > 0
                                ? selectionElectionDetail.candidates.map((item, index) => <p key={index}>{item.candidateId}</p>)
                                : null}
                        </div>
                    </>
                )}
            </DialogContent>
            <DialogActions style={{ paddingTop: '5em' }}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={handleStart}>
                    Start Election
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ScheduledElectionDetail;
