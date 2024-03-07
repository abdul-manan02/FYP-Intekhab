import { PARTY_BASE_URL } from '../../util/constants';
import fetcher from '../../util/fetcher';

// get all the requests to join a party
export async function getAllParties() {
    try {
        const url = `${PARTY_BASE_URL}/api/v1/party`;
        const response = await fetcher(url, 'GET');
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
}
