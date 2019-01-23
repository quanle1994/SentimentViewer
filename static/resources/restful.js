const BACKEND_SERVER = "http://localhost:3000";

const api = axios.create({
    baseURL: BACKEND_SERVER,
    responseType: 'json',
    timeout: 10000,
});

const getSentiments = () => api
    .get('/getSentiments');

const getSentiment = (id) => api
    .get('/getSentiment?id=' + id);

const getDonutData = () => api
    .get('/getDonutData');

const getLineData = () => api
    .get('/getLineData');