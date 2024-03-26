import { ADMIN_BASE_URL } from '../../util/constants';
import fetcher from '../../util/fetcher';

export async function createRequestParticipationAdmin(token, payload) {
    try {
        const url = `${ADMIN_BASE_URL}/api/v1/admin/candidateParticipation`;
        const response = await fetcher(url, 'POST', payload, token);
        return response.json();
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getParticipationRequestsAdmin(token) {
    try {
        const url = `${ADMIN_BASE_URL}/api/v1/admin/candidateParticipation`;
        const response = await fetcher(url, 'GET', null, token);
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
}

export async function updateParticipationRequestAdmin(id, token, payload) {
    try {
        const url = `${ADMIN_BASE_URL}/api/v1/admin/candidateParticipation/id/${id}`;
        const response = await fetcher(url, 'PUT', payload, token);
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
}
