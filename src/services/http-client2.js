import axios from 'axios';

const httpClient = axios.create({
    baseURL: "http://localhost:4005/api",
    //baseURL: "http://119.82.130.231:4005/api",
    headers: {
        "Content-Type": "application/json"
    }
});

export default httpClient;