import fetcher from '../../util/fetcher';
import { ADMIN_BASE_URL } from '../../util/constants';

// get all the pending requests
export async function getRequests() {
    try {
        const url = `${ADMIN_BASE_URL}/api/v1/admin/partyApproval`;
        const admin = JSON.parse(localStorage.getItem('admin'));
        const response = await fetcher(url, 'GET', null, admin.token);
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
}

export async function acceptRequest(id, payload) {
    console.log(id, payload);
    try {
        const url = `${ADMIN_BASE_URL}/api/v1/admin/partyApproval/id/${id}`;
        const response = await fetcher(url, 'PUT', payload, admin.token);
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
}
