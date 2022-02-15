import Axios from './axios'

class Request {
    getUserInfo() {
        Axios.get('/auth/loggedin', res => res)
    }

    getUser() {
        Axios.get('/user', res => res)
    }

    handleOk(selectedUser: string, values: Record<string, any>[]) {
        Axios.put(`/user${selectedUser}`, { ...values }, res => res)
    }
}

export default new Request()