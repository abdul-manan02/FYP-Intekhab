import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { IconButton, Snackbar, Alert } from '@mui/material';
import { useState } from 'react';

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
        backgroundColor: 'white',
        '&:hover, &.Mui-hovered': {
            backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
            '@media (hover: none)': {
                backgroundColor: 'transparent',
            },
        },
        '&.Mui-selected': {
            backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY + theme.palette.action.selectedOpacity),
            '&:hover, &.Mui-hovered': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    ODD_OPACITY + theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity
                ),
                // Reset on touch devices, it doesn't add specificity
                '@media (hover: none)': {
                    backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY + theme.palette.action.selectedOpacity),
                },
            },
        },
    },
}));

export const CandidateEligibility = () => {
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const rows = [
        { id: 1, name: 'Bilal Khan', cnic: '37405-4700448-1', electionName: 'General-Elections-2023', constituency: 'NA-56' },
        { id: 2, name: 'Bilal Khan', cnic: '37405-4700448-1', electionName: 'General-Elections-2023', constituency: 'NA-56' },
        { id: 3, name: 'Bilal Khan', cnic: '37405-4700448-1', electionName: 'General-Elections-2023', constituency: 'NA-56' },
        { id: 4, name: 'Bilal Khan', cnic: '37405-4700448-1', electionName: 'General-Elections-2023', constituency: 'NA-56' },
        { id: 5, name: 'Bilal Khan', cnic: '37405-4700448-1', electionName: 'General-Elections-2023', constituency: 'NA-56' },
        { id: 6, name: 'Bilal Khan', cnic: '37405-4700448-1', electionName: 'General-Elections-2023', constituency: 'NA-56' },
    ];

    const columns = [
        { field: 'name', headerName: 'Name', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'bg-white' },
        { field: 'cnic', headerName: 'CNIC', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'bg-white' },
        { field: 'electionName', headerName: 'Election Name', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'bg-white' },
        { field: 'constituency', headerName: 'Constituency', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'bg-white' },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'bg-white',
            renderCell: (params) => {
                return (
                    <div className="flex">
                        <IconButton onClick={() => handleAction('Check')}>
                            <CheckCircleIcon style={{ color: 'green' }} />
                        </IconButton>
                        <IconButton onClick={() => handleAction('Cancel')}>
                            <CancelIcon style={{ color: 'red' }} />
                        </IconButton>
                    </div>
                );
            },
        },
    ];

    const handleAction = (action) => {
        let message;

        if (action === 'Check') {
            message = 'Acceptance confirmation sent successfully!';
        } else if (action === 'Cancel') {
            message = 'Rejection confirmation sent succssfully!';
        }

        setSnackbarMessage(message);
        setShowSnackbar(true);
    };

    const closeSnackbar = () => {
        setShowSnackbar(false);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        closeSnackbar();
    };

    const vertical = 'top';
    const horizontal = 'center';

    return (
        <div>
            <h1 className="rounded-tl-3xl rounded-br-3xl mx-[1rem] my-[0.5rem] p-[1rem] text-themePurple text-[2.25rem] font-[500] bg-white">
                Evaluate Candidate Eligibility
            </h1>
            <div style={{ margin: '1rem' }}>
                <StripedDataGrid
                    rows={rows}
                    columns={columns}
                    getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'odd' : 'even')}
                />
            </div>
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={showSnackbar}
                autoHideDuration={3000}
                onClose={closeSnackbar}
                message={snackbarMessage}
            >
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};
