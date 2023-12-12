import fetcher from '../../util/fetcher';
import { ADMIN_BASE_URL } from '../../util/constants';

// get all the pending requests
export async function getRequests() {
    try {
        const url = `${ADMIN_BASE_URL}/api/v1/admin/partyApproval`;
        const response = await fetcher(url, 'GET');
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
}

export async function acceptRequest(id, payload) {
    try {
        const url = `${ADMIN_BASE_URL}/api/v1/admin/partyApproval/${id}`;
        const response = await fetcher(url, 'PATCH', payload);
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
}
