/* eslint-disable class-methods-use-this */
import { message } from 'antd';
import Axios from './axios';

class Request {
  getUserInfo(): Promise<void> {
    return Axios.get('/auth/loggedin', (res) => res);
  }

  getUser(): Promise<void> {
    return Axios.get('/user', (res) => res);
  }

  getCategories(): Promise<void> {
    return Axios.get('/output/categories', (res) => res);
  }

  createOutput(payload: Record<string, any>): Promise<void> {
    return Axios.post('/output', payload, (res) => message.success(res.message));
  }

  getOutput(): Promise<void> {
    return Axios.get('/output', (res) => res);
  }

  getAllOutputs(): Promise<void> {
    return Axios.get('/output/all', (res) => res);
  }

  handleOk(selectedUser: string, values: Record<string, any>): Promise<any> {
    return Axios.put(`/user/${selectedUser}`, values, (res) => res);
  }
}

export default new Request();
