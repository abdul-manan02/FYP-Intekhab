import { ADMIN_BASE_URL } from '../../util/constants';
import fetcher from '../../util/fetcher';

export async function adminLogin(payload) {
    try {
        const url = `${ADMIN_BASE_URL}/api/v1/admin/login`;
        const response = await fetcher(url, 'POST', payload);

        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Failed to login. Please try again.');
        }

        return response.json();
    } catch (error) {
        throw error; // Throw the error here
    }
}

export async function adminLogout() {
    localStorage.removeItem('admin');
}
