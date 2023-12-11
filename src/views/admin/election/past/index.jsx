import { Button } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import { StripedDataGrid } from '../../../../components/StripedDataGrid';

const PastElections = () => {
    const rows = [
        { id: 1, winner: 'PTI', year: '2018', type: 'General-Elections' },
        { id: 2, winner: 'PTI', year: '2012', type: 'General-Elections' },
        { id: 3, winner: 'PTI', year: '2009', type: 'General-Elections' },
        { id: 4, winner: 'PTI', year: '2018', type: 'General-Elections' },
        { id: 5, winner: 'PTI', year: '2018', type: 'General-Elections' },
    ];

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
        <div style={{ margin: '0.5rem' }}>
            <StripedDataGrid
                rows={rows}
                columns={columns}
                getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'odd' : 'even')}
            />
        </div>
    );
};

export default PastElections;
