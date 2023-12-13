import { CITIZEN_DATA_BASE_URL } from '../../util/constants';
import fetcher from '../../util/fetcher';

export async function verifyCitizen(cnic) {
    try {
        const url = `${CITIZEN_DATA_BASE_URL}/api/v1/citizenData/cnic/${cnic}`;
        const response = await fetcher(url, 'GET');
        return response.json();
    } catch (error) {
        console.log('here', error.message);
        return error;
    }
}
