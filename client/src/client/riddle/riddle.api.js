import axios from 'axios';
import config from '../config';

export function savePaint({ paint, riddleId }) {
    const data = { paint, riddleId };
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        data: data,
        url: `${config.api_route}/riddles/save`,
        withCredentials: true
    };

    return axios(options);
}

export function markSolveState({ riddleId, solveState }) {
    const data = { riddleId, solveState };
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        // headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: data,
        url: `${config.api_route}/riddles/solve`,
        withCredentials: true
    };
    return axios(options);
}
