import axios from "axios"

const api = axios.create({
    baseURL : 'http://localhost:3001/api',
    // baseURL : 'https://us-central1-wongnai-frontend-assignment.cloudfunctions.net/api/',
    timeout: 7000,
})

export default api