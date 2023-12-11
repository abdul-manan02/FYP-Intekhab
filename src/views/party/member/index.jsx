import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import { DeletePopup } from './DeletePopup';

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

const ManageMembers = () => {
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [choice, setChoice] = useState('incoming');
    const [deletePopup, setDeletePopup] = useState(false);
    const [confirmMsg, setConfirmMsg] = useState('');

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
                        {choice === 'incoming' ? (
                            <IconButton
                                onClick={() => {
                                    setDeletePopup(true);
                                }}
                            >
                                <CheckCircleIcon style={{ color: 'green' }} />
                            </IconButton>
                        ) : null}
                        {choice === 'members' ? (
                            <IconButton
                                onClick={() => {
                                    setDeletePopup(true);
                                }}
                            >
                                <CancelIcon style={{ color: 'red' }} />
                            </IconButton>
                        ) : null}
                    </div>
                );
            },
        },
    ];

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        closeSnackbar();
    };

    return (
        <div>
            <DeletePopup opened={deletePopup} setOpened={setDeletePopup} />
            <h1 className="rounded-tl-3xl rounded-br-3xl m-[0.5rem] p-[1rem] text-themePurple text-[2.25rem] font-[500] bg-white">
                Managing Members
            </h1>

            <div className="p-[0.5rem] flex gap-2">
                <button
                    // className={`bg-themePurple text-white font-semibold px-[2.25rem] py-[1.25rem] border border-themePurple rounded-[0.4375rem] transition delay-75
                    // hover:bg-white hover:text-themePurple hover:border-white ${
                    //     choice === 'incoming' ? 'bg-white text-themePurple border-white' : ''
                    // } `}
                    className=" bg-themePurple text-white font-semibold px-[2.25rem] py-[1.25rem] border border-themePurple rounded-[0.4375rem] transition delay-75 hover:bg-white hover:text-themePurple hover:border-white"
                    onClick={() => setChoice('incoming')}
                >
                    Incoming Requests
                </button>
                <button
                    onClick={() => setChoice('members')}
                    className=" bg-themePurple text-white font-semibold px-[2.25rem] py-[1.25rem] border border-themePurple rounded-[0.4375rem] transition delay-75 hover:bg-white hover:text-themePurple hover:border-white"
                >
                    Active Members
                </button>
            </div>

            <div className="bg-themePurple p-[0.5rem] m-[0.5rem] text-white text-[2.25rem] font-[500] flex justify-center">
                {choice === 'incoming' ? <p>Incoming</p> : null}
                {choice === 'members' ? <p>Members</p> : null}
            </div>

            <div style={{ marginLeft: '0.5rem', marginRight: '0.5rem', marginTop: '1rem' }}>
                <StripedDataGrid
                    rows={rows}
                    columns={columns}
                    getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'odd' : 'even')}
                />
            </div>
        </div>
    );
};

export default ManageMembers;
