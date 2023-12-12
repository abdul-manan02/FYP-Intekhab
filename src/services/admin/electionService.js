import fetcher from '../../util/fetcher';

const baseURL = import.meta.env.VITE_ADMIN_SERVICE;

// creates an election through admin
export async function createElection(payload) {
    try {
        const url = `${baseURL}/api/v1/admin/election`;
        const response = await fetcher(url, 'POST', payload);
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
}

export async function getStartedElections() {
    try {
        const url = `${baseURL}/api/v1/admin/election/started`;
        const response = await fetcher(url, 'GET');
        return response.json();
    } catch (error) {}
}

export async function getConstituencies() {
    try {
        const url = `${baseURL}/api/v1/admin/constituency`;
        const response = await fetcher(url, 'GET');
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
}
