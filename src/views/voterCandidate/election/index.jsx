import React from 'react';
import { getElectionForVoter } from '../../../services/voterCandidate/electionService';
import { useEffect, useState } from 'react';
import { getPartyById } from '../../../services/party/getAllParties';
import CandidateElectionParticipationDetail from './detail';
import { createRequestParticipationAdmin } from '../../../services/admin/participationElection';
import { useAtom } from 'jotai';
import { scheduledDetailParticipationAtom } from '../../../store/admin';
import dayjs from 'dayjs';
import { StripedDataGrid } from '../../../components/StripedDataGrid';
import { Button } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';

const ElectionVoter = () => {
    const voter = JSON.parse(localStorage.getItem('voter-candidate'));
    const [electionData, setElectionData] = useState(null);
    const [partyData, setPartyData] = useState(null);
    const [requests, setRequests] = useState([]);

    const fetchElections = async () => {
        try {
            const res = await getElectionForVoter(voter.account._id, voter.token);
            setElectionData(res);
            if (res && res.length > 0) {
                setRequests(res);
            }
        } catch (error) {
            toast.error('Failed to fetch election information');
        }
    };

    useEffect(() => {
        if (voter.account) {
            fetchElections();
        }
    }, []);

    const fetchParty = async () => {
        try {
            const res = await getPartyById(voter.account.party, voter.token);
            setPartyData(res.party);
        } catch (error) {
            toast.error('Failed to fetch party information');
        }
    };

    useEffect(() => {
        if (voter.account.party) {
            fetchParty();
        }
    }, []);

    const [opened, setOpened] = useState(false);

    const [rows, setRows] = useState([]);

    const [, setScheduledSelected] = useAtom(scheduledDetailParticipationAtom);

    const handleSelectedRequest = (id) => {
        const filteredRequest = requests.find((item) => item._id.toString() === id.toString());
        setScheduledSelected(filteredRequest);
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
                    startTime: convertToReadableFormat(request.electionTime),
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
        { field: 'startTime', headerName: 'Scheduled Time', flex: 1, align: 'center', headerAlign: 'center', headerClassName: 'bg-white' },
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
        <div>
            <CandidateElectionParticipationDetail opened={opened} setOpened={setOpened} partyData={partyData}/>
            <h1 className="rounded-tl-3xl rounded-br-3xl m-[0.5rem] p-[1rem] text-themePurple text-[2.25rem] font-[500] bg-white">Election</h1>
            {voter?.account?.isCandidate ? (
                voter?.account?.party && partyData?.name ? (
                    <>
                        <p className="p-4 m-2 text-xl font-bold">You will be applying in elections as a member of {partyData?.name}</p>
                        {rows && rows.length > 0 ? (
                            <StripedDataGrid
                                rows={rows}
                                columns={columns}
                                getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'odd' : 'even')}
                            />
                        ) : (
                            <p className="p-4 m-2 text-xl font-bold">No elections scheduled at this time.</p>
                        )}
                    </>
                ) : (
                    <p>You will be applying as an independent candidate in the elections</p>
                )
            ) : (
                <p>Candidate access level required for this window</p>
            )}
        </div>
    );
};

export default ElectionVoter;
