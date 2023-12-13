import fetcher from '../../util/fetcher';

const baseURL = import.meta.env.VITE_ADMIN_SERVICE;

const adminToken = localStorage.getItem('adminToken');

// creates an election through admin
export async function createElection(payload) {
    try {
        const url = `${baseURL}/api/v1/admin/election`;
        const response = await fetcher(url, 'POST', payload, adminToken);
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
}

export async function getStartedElections() {
    try {
        const url = `${baseURL}/api/v1/admin/election/started`;
        const response = await fetcher(url, 'GET', undefined, adminToken);
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
}

export async function getCreatedElections() {
    try {
        const url = `${baseURL}/api/v1/admin/election/created`;
        const response = await fetcher(url, 'GET', undefined, adminToken);
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
}

export async function getFinishedElections() {
    try {
        const url = `${baseURL}/api/v1/admin/election/id/123`;
        const response = await fetcher(url, 'GET', undefined, adminToken);
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
}

export async function getConstituencies() {
    try {
        const url = `${baseURL}/api/v1/admin/constituency`;
        const response = await fetcher(url, 'GET', undefined, adminToken);
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
}
