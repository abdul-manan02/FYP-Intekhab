import { PARTY_BASE_URL } from '../../util/constants';
import fetcher from '../../util/fetcher';

// get all the requests to join a party
export async function getApprovalRequests(id, token) {
    try {
        const url = `${PARTY_BASE_URL}/api/v1/party/memberApproval/partyId/${id}/pending`;
        const response = await fetcher(url, 'GET', undefined, token);
        return response.json();
    } catch (error) {
        console.log(error.message);
    }
}

export async function applyForParty(token, payload) {
    try {
        const url = `${PARTY_BASE_URL}/api/v1/party/memberApproval`;
        const response = await fetcher(url, 'POST', payload, token);
        return response.json();
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function updatePartyApproval(token, payload, id) {
    try {
        const url = `${PARTY_BASE_URL}/api/v1/party/memberApproval/id/${id}`;
        const response = await fetcher(url, 'PUT', payload, token);
        return response.json();
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getAllMembers(id, token) {
    try {
        const url = `${PARTY_BASE_URL}/api/v1/party/members/${id}`;
        const response = await fetcher(url, 'GET', null, token);
        return response.json();
    } catch (error) {
        throw new Error(error.message);
    }
}
