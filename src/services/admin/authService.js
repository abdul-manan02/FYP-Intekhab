import { ADMIN_BASE_URL } from '../../util/constants';
import fetcher from '../../util/fetcher';

export async function adminLogin(payload) {
    try {
        const url = `${ADMIN_BASE_URL}/api/v1/admin/login`;
        const response = await fetcher(url, 'POST', payload);
        return response.json();
    } catch (error) {
        console.log('here', error.message);
        return error;
    }
}

export async function adminLogout() {
    localStorage.removeItem('admin');
}
