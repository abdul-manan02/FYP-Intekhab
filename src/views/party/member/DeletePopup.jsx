import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';

export const DeletePopup = ({ opened, setOpened }) => {
    const handleClose = () => {
        setOpened(false);
    };

    return (
        <Dialog open={opened} onClose={handleClose}>
            <DialogTitle>Are you sure you want to remove this Member?</DialogTitle>
            <DialogActions style={{ paddingTop: '5em' }}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Confirm</Button>
            </DialogActions>
        </Dialog>
    );
};
