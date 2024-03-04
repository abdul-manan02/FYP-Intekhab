import { StripedDataGrid } from '../../../components/StripedDataGrid';
import { Button } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import { getCandidateRequests } from '../../../services/admin/candidateService';
import { candidateRequestAtom } from '../../../store/admin';
import { useAtom } from 'jotai';
import { useState, useEffect } from 'react';
import CandidateRequestDetail from './detail';
import Loader from '../../../components/Loader';

const CandidateApproval = () => {
    const [, setSelectedRequest] = useAtom(candidateRequestAtom);

    const [opened, setOpened] = useState(false);

    const [requests, setRequests] = useState([]);

    const [rows, setRows] = useState([]);

    const fetchRequests = async () => {
        try {
            const response = await getCandidateRequests();
            setRequests(response.results);
            console.log(response);
        } catch (error) {
            console.log(error.message);
        }
    };

    const prepareRows = (requests) => {
        const data =
            requests.length > 0 &&
            requests.map((request) => {
                console.log('in here', request);
                return {
                    id: request._id,
                    candidate: request.accountId,
                    status: request.status,
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
        { field: 'candidate', headerName: 'Candidate', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'bg-white text-xl' },
        { field: 'status', headerName: 'Status', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'bg-white text-xl' },
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
            <CandidateRequestDetail opened={opened} setOpened={setOpened} />
            <h1 className="rounded-tl-3xl rounded-br-3xl m-[0.5rem] p-[1rem] text-themePurple text-[2.25rem] font-[500] bg-white">
                Candidate Approval
            </h1>
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

export default CandidateApproval;
