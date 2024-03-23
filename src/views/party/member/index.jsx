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
        const party = JSON.parse(localStorage.getItem('partyToken'));
        try {
            console.log('here', party);
            const response = await getApprovalRequests(party.party._id, party.token);
            console.log(response);
            setRequests(response.results);
        } catch (error) {
            console.log(error.message);
        }
    };

    const prepareRows = (requests) => {
        const data = requests.map((request) => {
            return {
                id: request._id,
                cnic: request.voterCandidate.cnic,
                name: request.voterCandidate.CitizenData.name,
                gender: request.voterCandidate.CitizenData.gender,
                proof: request.voterCandidate.proof,
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
