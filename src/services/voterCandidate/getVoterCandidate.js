import { VOTER_CANDIDATE_BASE_URL } from '../../util/constants';
import fetcher from '../../util/fetcher';
export async function getVoterCandidateById(id, token) {
    try {
        const url = `${VOTER_CANDIDATE_BASE_URL}/api/v1/voter/id/${id}`;

        const response = await fetcher(url, 'GET', null, token);

        if (!response.ok) {
            throw new Error(`Failed to fetch citizen data. Status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        throw error;
    }
}
