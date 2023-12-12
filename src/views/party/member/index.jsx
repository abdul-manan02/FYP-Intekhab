import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { DeletePopup } from './DeletePopup';
import { getApprovalRequests } from '../../../services/party/memberService';
import { StripedDataGrid } from '../../../components/StripedDataGrid';
import { OpenInNew } from '@mui/icons-material';
import { memberRequestAtom } from '../../../store/party';
import MemberRequestDetail from './detail';
import { useAtom } from 'jotai';

const ManageMembers = () => {
    const [choice, setChoice] = useState('incoming');
    const [deletePopup, setDeletePopup] = useState(false);

    const [, setSelectedRequest] = useAtom(memberRequestAtom);

    const [opened, setOpened] = useState(false);

    const [requests, setRequests] = useState([]);

    const [rows, setRows] = useState([]);

    const fetchRequests = async () => {
        try {
            const response = await getApprovalRequests();
            setRequests(response);
            console.log(response);
        } catch (error) {
            console.log(error.message);
        }
    };

    const prepareRows = (requests) => {
        const data = requests.map((request) => {
            return {
                id: request._id,
                cnic: request.memberData.cnic,
                name: request.memberData.name,
                gender: request.memberData.gender,
            };
        });

        setRows(data);
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    useEffect(() => {
        prepareRows(requests);
    }, [requests]);

    const handleSelectedRequest = (id) => {
        const filteredRequest = requests.find((item) => item._id.toString() === id.toString());
        setSelectedRequest(filteredRequest);
        setOpened(true);
    };

    // const rows = [
    //     { id: 1, name: 'Bilal Khan', cnic: '37405-4700448-1', electionName: 'General-Elections-2023', constituency: 'NA-56' },
    //     { id: 2, name: 'Bilal Khan', cnic: '37405-4700448-1', electionName: 'General-Elections-2023', constituency: 'NA-56' },
    //     { id: 3, name: 'Bilal Khan', cnic: '37405-4700448-1', electionName: 'General-Elections-2023', constituency: 'NA-56' },
    //     { id: 4, name: 'Bilal Khan', cnic: '37405-4700448-1', electionName: 'General-Elections-2023', constituency: 'NA-56' },
    //     { id: 5, name: 'Bilal Khan', cnic: '37405-4700448-1', electionName: 'General-Elections-2023', constituency: 'NA-56' },
    //     { id: 6, name: 'Bilal Khan', cnic: '37405-4700448-1', electionName: 'General-Elections-2023', constituency: 'NA-56' },
    // ];

    const columns = [
        { field: 'cnic', headerName: 'CNIC', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'bg-white text-xl' },
        { field: 'name', headerName: 'Name', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'bg-white text-xl' },
        { field: 'gender', headerName: 'Gender', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'bg-white text-xl' },
        {
            field: 'detail',
            headerName: 'Detail',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'bg-white text-xl',
            renderCell: (params) => {
                return (
                    <div className="flex">
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<OpenInNew />}
                            onClick={() => {
                                handleSelectedRequest(params.row.id);
                            }}
                        >
                            View Details
                        </Button>
                    </div>
                );
            },
        },
    ];

    return (
        <div>
            <MemberRequestDetail opened={opened} setOpened={setOpened} />
            <DeletePopup opened={deletePopup} setOpened={setDeletePopup} />
            <h1 className="rounded-tl-3xl rounded-br-3xl m-[0.5rem] p-[1rem] text-themePurple text-[2.25rem] font-[500] bg-white">
                Managing Members
            </h1>

            <div className="p-[0.5rem] flex gap-2">
                <button
                    className={`text-sm font-semibold px-4 py-2 border border-themePurple rounded-[0.4375rem] transition delay-75
                    hover:bg-white hover:text-themePurple hover:border-white ${
                        choice === 'incoming' ? 'bg-white text-themePurple border-white' : 'bg-themePurple text-white'
                    } `}
                    onClick={() => setChoice('incoming')}
                >
                    Incoming Requests
                </button>
                <button
                    onClick={() => setChoice('members')}
                    className={`text-sm font-semibold px-3 py-1 border border-themePurple rounded-[0.4375rem] transition delay-75
                    hover:bg-white hover:text-themePurple hover:border-white ${
                        choice === 'members' ? 'bg-white text-themePurple border-white' : 'bg-themePurple text-white'
                    } `}
                >
                    Active Members
                </button>
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
