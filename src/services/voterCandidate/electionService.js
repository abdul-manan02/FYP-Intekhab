import fetcher from '../../util/fetcher';
import { VOTER_CANDIDATE_BASE_URL } from '../../util/constants';

export async function getElectionForVoter(id, token) {
    try {
        const url = `${VOTER_CANDIDATE_BASE_URL}/api/v1/voter/id/${id}/getElections/created`;

        const response = await fetcher(url, 'GET', null, token);

        if (!response.ok) {
            throw new Error(`Failed to fetch election data. Status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        throw error;
    }
}

export async function getElectionForVoterStarted(id, token) {
    try {
        const url = `${VOTER_CANDIDATE_BASE_URL}/api/v1/voter/id/${id}/getElections/started`;

        const response = await fetcher(url, 'GET', null, token);

        if (!response.ok) {
            throw new Error(`Failed to fetch election data. Status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        throw error;
    }
}

export async function castVote(id, payload) {
    try {
        const url = `${VOTER_CANDIDATE_BASE_URL}/api/v1/voter/castVote/id/${id}`;

        const response = await fetcher(url, 'POST', payload, null);

        if (!response.ok) {
            throw new Error(`Failed to cast vote. Status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        throw error;
    }
}
