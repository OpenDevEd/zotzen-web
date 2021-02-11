import axios, { AxiosRequestConfig } from "axios"

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
})

axiosInstance.interceptors.request.use(async (requestConfig: AxiosRequestConfig) => {
  const token = await localStorage.getItem("token")
  requestConfig.headers.common['auth-access'] = token
  return requestConfig
})

axiosInstance.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    if (process.env.NODE_ENV !== "production") {
      console.log(err.response?.data)
    }
    throw err.response?.data || err.response || err.message
  }
)
