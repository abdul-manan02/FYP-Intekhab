import { Button } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import { StripedDataGrid } from '../../../../components/StripedDataGrid';
import { getStartedElections } from '../../../../services/admin/electionService';
import { useState, useEffect } from 'react';
import { electionDetailAtom } from '../../../../store/admin';
import { useAtom } from 'jotai';
import CurrentElectionDetail from './detail';
import Loader from '../../../../components/Loader';

const CurrentElections = () => {
    const [opened, setOpened] = useState(false);

    const [requests, setRequests] = useState([]);

    const [rows, setRows] = useState([]);

    const [, setSelectedElectionDetail] = useAtom(electionDetailAtom);

    const fetchRequests = async () => {
        try {
            const response = await getStartedElections();
            setRequests(response);
            console.log(response);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleSelectedRequest = (id) => {
        const filteredRequest = requests.find((item) => item._id.toString() === id.toString());
        setSelectedElectionDetail(filteredRequest);
        setOpened(true);
    };

    const prepareRows = (requests) => {
        const data =
            requests &&
            requests.length > 0 &&
            requests.map((request) => {
                return {
                    id: request._id,
                    startTime: convertToReadableTime(request.electionTime),
                    type: request.electionType,
                };
            });

        setRows(data);
    };

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

    useEffect(() => {
        prepareRows(requests);
    }, [requests]);

    const columns = [
        { field: 'startTime', headerName: 'Time Started', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'bg-white' },
        { field: 'type', headerName: 'Election Type', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'bg-white' },
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
        <div className="mx-[0.5rem] mt-8">
            <CurrentElectionDetail opened={opened} setOpened={setOpened} />
            {rows && rows.length > 0 ? (
                <StripedDataGrid
                    rows={rows}
                    columns={columns}
                    getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'odd' : 'even')}
                />
            ) : (
                <Loader className={'mt-20'} />
            )}
        </div>
    );
};

export default CurrentElections;
