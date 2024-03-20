import React, { useEffect, useState } from 'react';
import CandidateCard from '../components/CandidateCard';
import { getAllParties } from '../../../../services/party/getAllParties';
import toast from 'react-hot-toast';
import Loader from '../../../../components/Loader';

const NA = () => {
    const [parties, setParties] = useState([]);

    const fetchParties = async () => {
        try {
            const response = await getAllParties();
            setParties(response);
        } catch (error) {
            toast.error('Failed to get parties');
        }
    };

    useEffect(() => {
        fetchParties();
    }, []);

    return (
        <div className="p-4 m-2">
            {parties && parties.length > 0 ? parties.map((party, index) => <CandidateCard key={index} party={party} />) : <Loader />}
        </div>
    );
};

export default NA;
