import { TextField, InputLabel, CircularProgress, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { getConstituencies, createElection } from '../../../../services/admin/electionService';
import ConstituencyDropDown from '../../components/ConstituencyDropDown';
import ElectionDropDown from '../../components/ElectionDropDown';
import { constituencyAtom, electionAtom } from '../../../../store/admin';
import { useAtom } from 'jotai';

const electionTypes = ['General Elections', 'By Elections'];

const CreateElection = () => {
    const [loading, setLoading] = useState(false);
    const [constituencyData, setConstituencyData] = useState([]);
    const [filteredConstituencyData, setFilteredConstituencyData] = useState([]);
    const [selectedConstituency] = useAtom(constituencyAtom);
    const [selectedElection] = useAtom(electionAtom);

    const adminToken = localStorage.getItem("adminToken")

    const fetchConstituencies = async () => {
        try {
            const response = await getConstituencies();
            const constituencies = response.constituencies;
            const names = constituencies.map((constituency) => {
                return constituency.name;
            });
            setConstituencyData(constituencies);
            setFilteredConstituencyData(names);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchConstituencies();
    }, []);

    const handleCreateClick = async () => {
        setLoading(true);
        try {
            if (selectedElection === 'By Elections') {
                const constituencyObj = constituencyData.filter((constituency) => constituency.name === selectedConstituency);
                console.log(constituencyObj);
                const requestBody = {
                    electionType: selectedElection,
                    constituency: constituencyObj[0],
                };
                console.log('body', requestBody);
                const response = await createElection(requestBody);
                console.log('by elections', response);
            } else if (selectedElection === 'General Elections') {
                const requestBody = {
                    electionType: selectedElection,
                    token: adminToken
                };
                const response = await createElection(requestBody);
                console.log('general', response);
            }
        } catch (error) {
            console.error('Error during creation of election:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" px-16 py-8 mx-[0.5rem] mt-8 bg-white">
            <div className="flex gap-8">
                <div className="w-full">
                    <InputLabel
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '1.5rem',
                        }}
                    >
                        Election Type
                    </InputLabel>
                    <ElectionDropDown data={electionTypes} />
                </div>
            </div>

            {filteredConstituencyData.length > 0 && selectedElection !== 'General Elections' ? (
                <div className="mt-8">
                    <InputLabel
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '1.5rem',
                        }}
                    >
                        Constituency
                    </InputLabel>
                    <ConstituencyDropDown data={filteredConstituencyData} />
                </div>
            ) : null}

            <div className="mt-8">
                <div className="flex items-end justify-end mt-8">
                    <button className="px-10 py-4 text-lg text-white bg-themePurple" onClick={handleCreateClick} disabled={loading}>
                        {loading ? <CircularProgress color="inherit" size={20} /> : 'Create'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateElection;
