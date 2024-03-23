import { CITIZEN_DATA_BASE_URL } from '../../util/constants';
import fetcher from '../../util/fetcher';

export async function verifyCitizen(cnic) {
    try {
        const url = `${CITIZEN_DATA_BASE_URL}/api/v1/citizenData/cnic/${cnic}`;

        console.log(url);

        const response = await fetcher(url, 'GET');

        if (!response.ok) {
            throw new Error(`Failed to fetch citizen data. Status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        throw error;
    }
}

export async function getCitizenById(id) {
    try {
        const url = `${CITIZEN_DATA_BASE_URL}/api/v1/citizenData/id/${id}`;

        console.log(url);

        const response = await fetcher(url, 'GET');

        if (!response.ok) {
            throw new Error(`Failed to fetch citizen data. Status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        throw error;
    }
}
