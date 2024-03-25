import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useAtom } from 'jotai';
import { scheduledDetailParticipationAtom } from '../../../../store/admin';
import toast from 'react-hot-toast';
import { FileUploader } from 'react-drag-drop-files';
import { constituencyAtomVoterElection } from '../../../../store/admin';
import ConstituencyDropDownVoterElection from '../components/DropDown';
import { PARTY_BASE_URL, ADMIN_BASE_URL } from '../../../../util/constants';

const CandidateElectionParticipationDetail = ({ opened, setOpened, partyData }) => {
    const voter = JSON.parse(localStorage.getItem('voter-candidate'));
    const [selectionElectionDetail] = useAtom(scheduledDetailParticipationAtom);
    const [selectedConstituency] = useAtom(constituencyAtomVoterElection);

    const handleClose = () => {
        setOpened(false);
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

    const [doc, setDoc] = useState(null);
    const fileTypePDF = ['PDF'];

    const handleDocChange = (file) => {
        setDoc(file);
    };

    const handleApply = async () => {
        try {
            if (voter.account.party) {
                // apply to party
                const formData = new FormData();
                formData.append('accountId', voter.account._id);
                formData.append('partyId', partyData._id);
                formData.append('constituencyId', selectedConstituency);
                formData.append('electionId', selectionElectionDetail._id);

                // Append files to formData
                formData.append('documents', doc);

                const requestOptions = {
                    method: 'POST',
                    body: formData,
                };
                const url = `${PARTY_BASE_URL}/api/v1/party/candidateParticipation`;
                const response = await fetch(url, requestOptions);
                const data = await response.json();
                toast.success('Application successful, awaiting approval from Party!');
            } else {
                // apply to admin
                const formData = new FormData();
                formData.append('accountId', voter.account._id);
                formData.append('constituencyId', selectedConstituency);
                formData.append('electionId', selectionElectionDetail._id);

                // Append files to formData
                formData.append('documents', doc);

                const requestOptions = {
                    method: 'POST',
                    body: formData,
                };
                const url = `${ADMIN_BASE_URL}/api/v1/admin/candidateParticipation`;
                const response = await fetch(url, requestOptions);
                const data = await response.json();
                toast.success('Application successful, awaiting approval from Admin!');
            }
        } catch (error) {
            toast.error('Failed to apply for participation in this election');
        }
    };

    return (
        <Dialog open={opened} onClose={handleClose}>
            <DialogTitle>Election details</DialogTitle>
            <DialogContent className="w-[30rem]">
                {selectionElectionDetail && (
                    <div className="flex flex-col gap-4">
                        <p className="font-bold">Election type:</p>
                        <p>{selectionElectionDetail.electionType}</p>
                        <p className="font-bold">Select Constituency:</p>
                        <ConstituencyDropDownVoterElection data={selectionElectionDetail.constituencies} />
                        <p className="font-bold">Start time:</p>
                        <p>{convertToReadableTime(selectionElectionDetail.electionTime)}</p>
                        <p className="font-bold">Candidates:</p>
                        <div>
                            {selectionElectionDetail.candidates && selectionElectionDetail.candidates.length > 0
                                ? selectionElectionDetail.candidates.map((item, index) => <p key={index}>{item.candidateId}</p>)
                                : null}
                        </div>
                        <label htmlFor="name" className="mt-4">
                            Attach Relevant Document
                        </label>
                        <FileUploader handleChange={handleDocChange} name="file" types={fileTypePDF} />
                    </div>
                )}
            </DialogContent>
            <DialogActions style={{ paddingTop: '5em' }}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" onClick={handleApply}>
                    Apply
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CandidateElectionParticipationDetail;
