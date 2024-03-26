import { PARTY_BASE_URL } from '../../util/constants';
import fetcher from '../../util/fetcher';

export async function getParticipationRequests(id, token) {
    try {
        const url = `${PARTY_BASE_URL}/api/v1/party/candidateParticipation/partyId/${id}`;
        const response = await fetcher(url, 'GET', null, token);
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
}

export async function updateParticipationRequest(id, token, payload) {
    try {
        const url = `${PARTY_BASE_URL}/api/v1/party/candidateParticipation/id/${id}`;
        const response = await fetcher(url, 'PUT', payload, token);
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
}
