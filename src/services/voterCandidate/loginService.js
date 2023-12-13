import { VOTER_CANDIDATE_BASE_URL } from '../../util/constants';
import fetcher from '../../util/fetcher';

export async function voterLogin(payload) {
    try {
        const url = `${VOTER_CANDIDATE_BASE_URL}/api/v1/voter/login`;
        const response = await fetcher(url, 'POST', payload);
        return response.json();
    } catch (error) {
        console.log('here', error.message);
        return error;
    }
}

export async function voterRegister(payload) {
    try {
        const url = `${VOTER_CANDIDATE_BASE_URL}/api/v1/voter/sign-up`;
        const response = await fetcher(url, 'POST', payload);
        return response.json();
    } catch (error) {
        console.log('here', error.message);
        return error;
    }
}