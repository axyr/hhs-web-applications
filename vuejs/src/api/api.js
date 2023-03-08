import axios from 'axios';

const api = axios.create({
    baseURL: '//localhost:3000',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    validateStatus: function (status) {
        return status <= 210;
    },
});

export {
    api
};