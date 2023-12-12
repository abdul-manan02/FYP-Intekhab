import { ADMIN_BASE_URL } from '../../util/constants';
import fetcher from '../../util/fetcher';

export async function getCandidateRequests() {
    try {
        const url = `${ADMIN_BASE_URL}/api/v1/admin/candidateApproval`;
        const response = await fetcher(url, 'GET');
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
}
