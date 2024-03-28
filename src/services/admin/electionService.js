import fetcher from '../../util/fetcher';

const baseURL = import.meta.env.VITE_ADMIN_SERVICE;

// creates an election through admin
export async function createElection(payload) {
    try {
        const url = `${baseURL}/api/v1/admin/election`;
        const admin = JSON.parse(localStorage.getItem('admin'));
        const response = await fetcher(url, 'POST', payload, admin.token);
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
}

export async function getStartedElections() {
    try {
        const url = `${baseURL}/api/v1/admin/election/started`;
        const admin = JSON.parse(localStorage.getItem('admin'));
        const response = await fetcher(url, 'GET', undefined, admin.token);
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
}

export async function getCreatedElections() {
    try {
        const url = `${baseURL}/api/v1/admin/election/created`;
        const admin = JSON.parse(localStorage.getItem('admin'));
        const response = await fetcher(url, 'GET', undefined, admin.token);
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
}

export async function getFinishedElections() {
    try {
        const url = `${baseURL}/api/v1/admin/election/id/123`;
        const admin = JSON.parse(localStorage.getItem('admin'));
        const response = await fetcher(url, 'GET', undefined, admin.token);
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
}

export async function getConstituencies() {
    try {
        const url = `${baseURL}/api/v1/admin/constituency`;
        const admin = JSON.parse(localStorage.getItem('admin'));
        const response = await fetcher(url, 'GET', undefined, admin.token);
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
}

export async function startElection(id) {
    try {
        const url = `${baseURL}/api/v1/admin/election/id/${id}/start`;
        const admin = JSON.parse(localStorage.getItem('admin'));
        const response = await fetcher(url, 'GET', undefined, admin.token);
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
}

// localhost:1002

export async function changeContituency(payload) {
    try {
        const url = `${baseURL}/api/v1/admin/constituencyChangeRequest`;
        const admin = JSON.parse(localStorage.getItem('admin'));
        const response = await fetcher(url, 'POST', payload, admin.token);
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
}

export async function getContituencyRequests() {
    try {
        const url = `${baseURL}/api/v1/admin/constituencyChangeRequest`;
        const admin = JSON.parse(localStorage.getItem('admin'));
        const response = await fetcher(url, 'GET', undefined, admin.token);
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
}

export async function updateContituency(payload, id) {
    try {
        const url = `${baseURL}/api/v1/admin/constituencyChangeRequest/id/${id}`;
        const admin = JSON.parse(localStorage.getItem('admin'));
        const response = await fetcher(url, 'PUT', payload, admin.token);
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
}
