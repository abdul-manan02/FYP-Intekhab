import { StripedDataGrid } from '../../../components/StripedDataGrid';
import { Button } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import { getRequests } from '../../../services/admin/partyService';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PartyRequestDetail from './detail';
import { partyRequestAtom } from '../../../store/admin';
import { useAtom } from 'jotai';
import Loader from '../../../components/Loader';

const PartyApproval = () => {
    const navigate = useNavigate();

    const [opened, setOpened] = useState(false);

    const [requests, setRequests] = useState([]);

    const [rows, setRows] = useState(null);

    const [, setSelectedRequest] = useAtom(partyRequestAtom);

    const fetchRequests = async () => {
        try {
            const response = await getRequests();
            setRequests(response);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, [opened]);

    const handleSelectedRequest = (id) => {
        const filteredRequest = requests.find((item) => item._id.toString() === id.toString());
        setSelectedRequest(filteredRequest);
        setOpened(true);
    };

    const prepareRows = (requests) => {
        const data =
            requests &&
            requests.map((request) => {
                return {
                    id: request._id,
                    party: request.name,
                    chairman: request.leaderCNIC,
                };
            });
        setRows(data);
    };

    useEffect(() => {
        prepareRows(requests);
    }, [requests]);

    const columns = [
        { field: 'party', headerName: 'Name', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'bg-white text-xl' },
        { field: 'chairman', headerName: 'Chairman', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'bg-white text-xl' },
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
        <>
            <PartyRequestDetail opened={opened} setOpened={setOpened} />

            <h1 className="rounded-tl-3xl rounded-br-3xl m-[0.5rem] p-[1rem] text-themePurple text-[2.25rem] font-[500] bg-white">Party Approval</h1>
            <div className="mx-[0.5rem] mt-10">
                {rows && rows.length > 0 ? (
                    <StripedDataGrid
                        rows={rows}
                        columns={columns}
                        getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'odd' : 'even')}
                    />
                ) : (
                    <Loader />
                )}
            </div>
        </>
    );
};

export default PartyApproval;
