import { PARTY_BASE_URL } from '../../util/constants';

export async function createRequestParticipationParty(token, payload) {
    try {
        const url = `${PARTY_BASE_URL}/api/v1/party/candidateParticipation`;
        const response = await fetcher(url, 'POST', payload, token);
        return response.json();
    } catch (error) {
        throw new Error(error.message);
    }
}
