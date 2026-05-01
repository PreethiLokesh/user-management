import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api'

const UserService = {

    getAllUsers: (name = '', page = 0, size = 10) => {
        return axios.get(`${BASE_URL}/users`, {
            params: { name, page, size }
        })
    },

    getUserById: (id) => {
        return axios.get(`${BASE_URL}/users/${id}`)
    },

    createUser: (user) => {
        return axios.post(`${BASE_URL}/users`, user)
    },

    updateUser: (id, user) => {
        return axios.put(`${BASE_URL}/users/${id}`, user)
    },

    deleteUser: (id) => {
        return axios.delete(`${BASE_URL}/users/${id}`)
    }
}

export default UserService