import { ADMIN_BASE_URL } from '../../util/constants';
import fetcher from '../../util/fetcher';

export async function getCandidateRequests() {
    try {
        const url = `${ADMIN_BASE_URL}/api/v1/admin/candidateApproval`;
        const admin = JSON.parse(localStorage.getItem('admin'));
        const response = await fetcher(url, 'GET', null, admin.token);
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
}
