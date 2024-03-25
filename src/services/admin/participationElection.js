import { ADMIN_BASE_URL } from '../../util/constants';

export async function createRequestParticipationAdmin(token, payload) {
    try {
        const url = `${ADMIN_BASE_URL}/api/v1/admin/candidateParticipation`;
        const response = await fetcher(url, 'POST', payload, token);
        return response.json();
    } catch (error) {
        throw new Error(error.message);
    }
}
