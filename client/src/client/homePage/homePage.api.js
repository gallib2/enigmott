import axios from 'axios';
import config from '../config';

export async function getRiddlesApi() {
    const options = {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
        url: `${config.api_route}/riddles`,
        withCredentials: true
    };
    const res = await axios(options);
    const riddles = (res && res.data && res.data) || [];

    return riddles;
}
