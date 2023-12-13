import React, { useEffect, useState } from 'react';
import { getCreatedElections } from '../../../../services/admin/electionService';
import { StripedDataGrid } from '../../../../components/StripedDataGrid';
import { scheduledDetailAtom } from '../../../../store/admin';
import { useAtom } from 'jotai';
import { Button } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import ScheduledElectionDetail from './detail';

const ScheduledElection = () => {
    const [opened, setOpened] = useState(false);

    const [requests, setRequests] = useState([]);

    const [rows, setRows] = useState([]);

    const [, setScheduledSelected] = useAtom(scheduledDetailAtom);

    const fetchRequests = async () => {
        try {
            const response = await getCreatedElections();
            if (response && response.length > 0) {
                setRequests(response);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleSelectedRequest = (id) => {
        const filteredRequest = requests.find((item) => item._id.toString() === id.toString());
        setScheduledSelected(filteredRequest);
        setOpened(true);
    };

    const prepareRows = (requests) => {
        const data = requests.map((request) => {
            return {
                id: request._id,
                startTime: 'Not started',
                type: request.electionType,
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
        <div className="m-2 bg-white">
            <ScheduledElectionDetail opened={opened} setOpened={setOpened} />
            <StripedDataGrid
                rows={rows}
                columns={columns}
                getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'odd' : 'even')}
            />
        </div>
    );
};

export default ScheduledElection;
