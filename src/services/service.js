import axios from "axios"

// export const BACKEND_URL = "http://localhost:3000"
export const BACKEND_URL = "https://sendemailproject-backend.onrender.com"
const uri = BACKEND_URL + "/api";

axios.defaults.withCredentials = true
// axios.defaults.headers.common['Authorization']=`Bearer ${localStorage .getItem('token')}`

axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const adminLogin = (payload) => {
    return axios.post(uri + '/admin/login', payload)
}

export const getAdminProfile = () => {
    return axios.get(uri + '/admin/get_admin_info')
}

export const updateaAdminProfile = (payload) => {
    return axios.put(uri + '/admin/update_admin', payload)
}

export const changeAdminPassword = (payload) => {
    return axios.put(uri + '/admin/reset_password', payload)
}

export const dashboardData = () => {
    return axios.get(uri + '/admin/dashboard')
}

export const retrieveUsers = (categoryId) => {
    return axios.get(uri + `/admin/get_users/${categoryId}`)
}

export const addUser = (payload) => {
    return axios.post(uri + '/admin/create_user', payload)
}
export const addCategory = (payload) => {
    return axios.post(uri + '/admin/create_category', payload)
}

export const retrieveClients = () => {
    return axios.get(uri + '/admin/get_clients')
}

export const addClient = (payload) => {
    return axios.post(uri + '/admin/create_client', payload)
}

export const sendEmail = (payload) => {
    return axios.post(uri + '/admin/sendEmail', payload)
}

