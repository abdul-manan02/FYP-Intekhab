import { Button } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import { StripedDataGrid } from '../../../../components/StripedDataGrid';
import { getStartedElections } from '../../../../services/admin/electionService';
import { useState, useEffect } from 'react';

const CurrentElections = () => {
    const [opened, setOpened] = useState(false);

    const [requests, setRequests] = useState([]);

    const[rows, setRows] = useState([]);

    // const [, setSelectedRequest] = useAtom(partyRequestAtom);

    const fetchRequests = async () => {
        try {
            const response = await getStartedElections();
            setRequests(response);
            console.log(response)
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleSelectedRequest = (id) => {
        const filteredRequest = requests.find((item) => item._id.toString() === id.toString());
        setSelectedRequest(filteredRequest)
        setOpened(true);
    };

    const prepareRows = (requests) => {
        const data = requests.map((request) => {
            return {
                id: request._id,
                party: request.name,
                chairman: request.leaderCNIC,
            };
        });

        setRows(data);
    };

    // useEffect(() => {
    //     prepareRows(requests);
    // }, [requests]);

    // const rows = [
    //     { id: 1, winner: 'PTI', year: '2018', type: 'General-Elections' },
    //     { id: 2, winner: 'PTI', year: '2012', type: 'General-Elections' },
    //     { id: 3, winner: 'PTI', year: '2009', type: 'General-Elections' },
    //     { id: 4, winner: 'PTI', year: '2018', type: 'General-Elections' },
    //     { id: 5, winner: 'PTI', year: '2018', type: 'General-Elections' },
    // ];

    const columns = [
        { field: 'winner', headerName: 'Name', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'bg-white' },
        { field: 'year', headerName: 'Year', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'bg-white' },
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
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<OpenInNew />}
                            onClick={() => window.open('https://example.com', '_blank')}
                        >
                            View Details
                        </Button>
                    </div>
                );
            },
        },
    ];

    return (
        <div className='mx-[0.5rem] mt-8'>
            <StripedDataGrid
                rows={rows}
                columns={columns}
                getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'odd' : 'even')}
            />
        </div>
    );
};

export default CurrentElections;
