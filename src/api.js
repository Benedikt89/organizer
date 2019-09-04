import axios from 'axios';

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {'API-KEY': "0f32e29f-2408-4879-8199-f94cc9bd7861"}
});
export default instance;