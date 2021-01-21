import { axios } from "../services"

export const saveNewOutput = (data: any) => {
  return axios.post(`/output`, data).then((res) => {
    return res.data
  })
};

export const fetchOutputCategories = () => {
  return axios.get(`/output/categories`).then((res) => {
    return res.data
  })
};