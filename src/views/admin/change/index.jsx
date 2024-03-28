import React, { useEffect, useState } from 'react';
import { getContituencyRequests } from '../../../services/admin/electionService';
import { StripedDataGrid } from '../../../components/StripedDataGrid';
import Loader from '../../../components/Loader';
import { Button } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import { updateContituency } from '../../../services/admin/electionService';
import toast from 'react-hot-toast';
import { IoCheckmarkDoneCircle } from 'react-icons/io5';

const ConstituencyChange = () => {
    // const [, setSelectedRequest] = useAtom(candidateRequestAtom);

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

    const [opened, setOpened] = useState(false);

    const [requests, setRequests] = useState([]);

    const [rows, setRows] = useState([]);

    const fetchRequests = async () => {
        const res = await getContituencyRequests();
        console.log('data', res.results);
        setRequests(res.results);
    };

    const prepareRows = (requests) => {
        const data =
            requests.length > 0 &&
            requests.map((request) => {
                return {
                    id: request._id,
                    address: request.changeTo,
                    status: request.status,
                    time: convertToReadableTime(request.submitTime),
                    doc: request.proof,
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

    const handleViewDocument = (id, doc) => {
        const url = `/admin/dashboard/pdf/${id}`;

        localStorage.setItem('state', JSON.stringify(doc));

        // Open the URL in a new tab
        window.open(url, '_blank');
    };

    const handleUpdateStatus = async (value, id) => {
        try {
            const req = {
                status: value,
            };
            const res = await updateContituency(req, id);
            fetchRequests();
            toast.success('Updated successfully');
        } catch (error) {
            toast.error('Failed to update request status, try again!');
        }
    };

    const columns = [
        { field: 'address', headerName: 'Address', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'bg-white text-xl' },
        { field: 'status', headerName: 'Status', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'bg-white text-xl' },
        { field: 'time', headerName: 'Submit Time', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'bg-white text-xl' },
        {
            field: 'doc',
            headerName: 'Document',
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
                                handleViewDocument(params.row.id, params.row.doc);
                            }}
                        >
                            View Attachment
                        </Button>
                    </div>
                );
            },
        },
        {
            field: 'actions',
            headerName: 'Actions',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
            headerClassName: 'bg-white text-xl',
            renderCell: (params) => {
                // Only render Accept and Reject buttons if status is 'Pending'
                if (params.row.status === 'Pending') {
                    return (
                        <div className="flex gap-2">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => {
                                    handleUpdateStatus('Accepted', params.row.id);
                                }}
                            >
                                Accept
                            </Button>
                            <Button
                                variant="contained"
                                color="warning"
                                onClick={() => {
                                    handleUpdateStatus('Rejected', params.row.id);
                                }}
                            >
                                Reject
                            </Button>
                        </div>
                    );
                } else {
                    return (
                        <div className='text-green-700'>
                            <IoCheckmarkDoneCircle size={40}/>
                        </div>
                    );
                }
            },
        },
    ];

    return (
        <div>
            <h1 className="rounded-tl-3xl rounded-br-3xl m-[0.5rem] p-[1rem] text-themePurple text-[2.25rem] font-[500] bg-white">
                Constituency Change Requests
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
        </div>
    );
};

export default ConstituencyChange;
