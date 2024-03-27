import { useState, useEffect } from 'react';
import { StripedDataGrid } from '../../../components/StripedDataGrid';
import { getParticipationRequests } from '../../../services/party/participation';
import toast from 'react-hot-toast';
import { approvalRequestAtom } from '../../../store/party';
import { useAtom } from 'jotai';
import dayjs from 'dayjs';
import { Button } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import CandidateEligibilityDetail from './detail';

const CandidateEligibility = () => {
    const party = JSON.parse(localStorage.getItem('partyToken'));
    const [requests, setRequests] = useState(null);

    const fetchRequests = async () => {
        try {
            const res = await getParticipationRequests(party.party._id, party.token);
            console.log('res', res.results);
            if (res.results && res.results.length > 0) {
                setRequests(res.results);
            } else {
                toast.error('No requests found');
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                toast.error('No requests found');
            } else {
                // toast.success('No incoming requests');
            }
        }
    };

    const [opened, setOpened] = useState(false);

    useEffect(() => {
        if (party && party?.party) {
            fetchRequests();
        }
    }, [opened]);

    

    const [rows, setRows] = useState([]);

    const [, setApprovalRequest] = useAtom(approvalRequestAtom);

    const handleSelectedRequest = (id) => {
        const filteredRequest = requests.find((item) => item._id.toString() === id.toString());
        setApprovalRequest(filteredRequest);
        setOpened(true);
    };

    function convertToReadableFormat(dateString) {
        return dayjs(dateString).format('MMMM D, YYYY [at] HH:mm:ss');
    }

    const prepareRows = (requests) => {
        const data =
            requests &&
            requests.length > 0 &&
            requests.map((request) => {
                console.log(request);
                return {
                    id: request._id,
                    name: request?.voterCandidate?.CitizenData?.name,
                    cnic: request?.voterCandidate?.CitizenData?.cnic,
                };
            });

        setRows(data);
    };

    useEffect(() => {
        if (requests && requests.length > 0) {
            prepareRows(requests);
        }
    }, [requests]);

    const columns = [
        { field: 'name', headerName: 'Name', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'bg-white' },
        { field: 'cnic', headerName: 'CNIC', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'bg-white' },
        {
            field: 'detail',
            headerName: 'Detail',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'bg-white',
            renderCell: (params) => {
                return (
                    <div className="flex">
                        <Button variant="contained" color="primary" startIcon={<OpenInNew />} onClick={() => handleSelectedRequest(params.row.id)}>
                            View Details
                        </Button>
                    </div>
                );
            },
        },
    ];

    return (
        <div>
            <CandidateEligibilityDetail opened={opened} setOpened={setOpened} />
            <h1 className="rounded-tl-3xl rounded-br-3xl m-[0.5rem] p-[1rem] text-themePurple text-[2.25rem] font-[500] bg-white">
                Evaluate Candidate Eligibility
            </h1>
            {rows && rows.length > 0 ? (
                <StripedDataGrid
                    rows={rows}
                    columns={columns}
                    getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'odd' : 'even')}
                />
            ) : (
                <p className="p-4 m-2 text-xl font-bold">No requests at this time.</p>
            )}
        </div>
    );
};

export default CandidateEligibility;
