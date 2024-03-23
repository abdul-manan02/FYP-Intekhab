import { PARTY_BASE_URL } from '../../util/constants';
import fetcher from '../../util/fetcher';

export async function partyLogin(payload) {
    try {
        const url = `${PARTY_BASE_URL}/api/v1/party/login`;
        const response = await fetcher(url, 'POST', payload);
        return response.json();
    } catch (error) {
        throw new Error(error.message); // Throw the error here
    }
}

export async function partyRegister(payload) {
    try {
        const url = `${PARTY_BASE_URL}/api/v1/party/signup`;
        const response = await fetcher(url, 'POST', payload);
        return response.json();
    } catch (error) {
        console.log('here', error.message);
        return error;
    }
}
