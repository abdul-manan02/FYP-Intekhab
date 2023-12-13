import fetcher from '../../util/fetcher';
import { ADMIN_BASE_URL } from '../../util/constants';
const adminToken = localStorage.getItem('adminToken');
// get all the pending requests
export async function getRequests() {
    try {
        const url = `${ADMIN_BASE_URL}/api/v1/admin/partyApproval`;
        const response = await fetcher(url, 'GET', undefined, adminToken);
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
}

export async function acceptRequest(id, payload) {
    console.log(id, payload);
    try {
        const url = `${ADMIN_BASE_URL}/api/v1/admin/partyApproval/id/${id}`;
        const response = await fetcher(url, 'PUT', payload, adminToken);
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
}
