import { TextField, InputLabel, CircularProgress, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { getConstituencies, createElection } from '../../../../services/admin/electionService';
import ConstituencyDropDown from '../../components/ConstituencyDropDown';
import ElectionDropDown from '../../components/ElectionDropDown';
import { constituencyAtom, electionAtom } from '../../../../store/admin';
import { useAtom } from 'jotai';
import Loader from '../../../../components/Loader';
import toast from 'react-hot-toast';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

const electionTypes = ['General Elections', 'By Elections'];

const CreateElection = () => {
    const [loading, setLoading] = useState(false);
    const [constituencyData, setConstituencyData] = useState([]);
    const [filteredConstituencyData, setFilteredConstituencyData] = useState([]);
    const [selectedConstituency] = useAtom(constituencyAtom);
    const [selectedElection] = useAtom(electionAtom);
    const [selectedTime, setSelectedTime] = useState(null); // State to hold selected time

    const adminToken = JSON.parse(localStorage.getItem('admin'));

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

        const formattedTime = dayjs(selectedTime).format('YYYY-MM-DDTHH:mm:ss.SSSZ');

        try {
            if (selectedElection === 'By Elections') {
                const constituencyObj = constituencyData.filter((constituency) => constituency.name === selectedConstituency);
                const requestBody = {
                    electionType: selectedElection,
                    constituency: constituencyObj[0],
                    selectedTime: formattedTime,
                };
                const response = await createElection(requestBody);
                toast.success('Election scheduled successfully');
            } else if (selectedElection === 'General Elections') {
                const requestBody = {
                    electionType: selectedElection,
                    token: adminToken.token,
                    selectedTime: selectedTime, // Pass selected time to the request body
                };
                const response = await createElection(requestBody);
                toast.success('Election scheduled successfully');
            }
        } catch (error) {
            console.error('Error during creation of election:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" px-16 py-8 mx-[0.5rem] mt-8 bg-white rounded-xl">
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

            <InputLabel
                sx={{
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                    marginTop: '2rem',
                }}
            >
                Schedule time
            </InputLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateTimePicker']}>
                    <DateTimePicker label="Basic date time picker" onChange={setSelectedTime} value={selectedTime} />
                </DemoContainer>
            </LocalizationProvider>

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
