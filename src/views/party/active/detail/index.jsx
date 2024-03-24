import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useAtom } from 'jotai';
import { selectedMemberAtom } from '../../../../store/admin';

const MemberDetail = ({ opened, setOpened }) => {
    const [selectedMember] = useAtom(selectedMemberAtom);

    const handleClose = () => {
        setOpened(false);
    };

    const convertToReadableTime = (submitTime) => {
        const date = new Date(submitTime);

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };

        // Format the date and time
        return date.toLocaleString(undefined, options);
    };

    return (
        <Dialog open={opened} onClose={handleClose}>
            {selectedMember?.CitizenData && ( // Check if selectedMember and selectedMember.CitizenData are not undefined
                <>
                    <DialogTitle>Party Member Details</DialogTitle>
                    <DialogContent className="w-[30rem]">
                        <p className="font-bold">Name</p>
                        <p>{selectedMember.CitizenData.name}</p>
                        <p className="font-bold">Cnic</p>
                        <p>{selectedMember.CitizenData.cnic}</p>
                        <p className="font-bold">Gender</p>
                        <p>{selectedMember.CitizenData.gender}</p>
                        <p className="font-bold">Marital Status</p>
                        <p>{selectedMember.CitizenData.maritalStatus}</p>
                        <p className="font-bold">Date of Birth</p>
                        <p>{convertToReadableTime(selectedMember.CitizenData.dateOfBirth)}</p>
                    </DialogContent>

                    <DialogActions style={{ paddingTop: '5em' }}>
                        <Button onClick={handleClose} variant="contained">
                            Close
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
};

export default MemberDetail;
