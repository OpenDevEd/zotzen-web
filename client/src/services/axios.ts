import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosError,
} from "axios"
import { message } from "antd"
import {msg} from './http-message'


class Axios {
  axiosInstance: AxiosInstance

  constructor() {
    const service = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
    })

    service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const token = localStorage.getItem("token")

        if (config.headers !== undefined) {
          config.headers["Content-Type"] = "application/json; charset=utf-8"
          config.headers["Access-Control-Allow-Origin"] = "*"
          config.headers["Access-Control-Allow-Methods"] =
            "GET, POST, PATCH, PUT, DELETE, OPTIONS"
          config.headers["Access-Control-Allow-Headers"] =
            "Origin, Content-Type, X-Auth-Token"
          config.headers["Accept"] = "application/json"
          if (token) config.headers["auth-access"] = token
        }
        return config
      },
      (error) => Promise.reject(error)
    )
    service.interceptors.response.use(
      this.handleSuccessResponse,
      this.handleErrorResponse
    )
    this.axiosInstance = service
  }

  handleSuccessResponse(response: AxiosResponse) {
    switch (response.data.status) {
      case 201:
        message.success(response.data.message)
        break
      case 200:
        return response
      default:
        // message.success(`${response.data.status}`)
        break
    }
    return Promise.resolve(response)
  }

  handleErrorResponse(error: AxiosError) {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          message.error(`${error.response.status} - ${msg.ACTION_BAD_REQUEST}`)
          break
        case 401:
          message.error(`${error.response.status} - ${msg.ACTION_UNAUTHORIZED}`)
          // window.location.href = "/"
          break
        case 403:
          message.error(`${error.response.status} - ${msg.ACTION_FORBIDDEN}`)
          break
        case 404:
          message.error(`${error.response.status} - ${msg.ACTION_NOT_FOUND}`)
          break
        case 500:
          message.error(`${error.response.status} - ${msg.ACTION_INTERNAL_SERVER}`)
          break
        default:
          message.error(
            `${error.response.status} - ${msg.ACTION_UNKNOWN}`
          )
          break
      }
    }
    return Promise.reject(error)
  }

  get(
    path: string,
    callback: (args: Record<string, any>) => void
  ): Promise<void> {
    return this.axiosInstance
      .request({
        method: "GET",
        url: `${process.env.REACT_APP_API_BASE_URL}${path}`,
        responseType: "json",
      })
      .then((reponse: AxiosResponse) => callback(reponse.data))
  }

  post(
    path: string,
    payload: Array<Record<string, any>> | Record<string, any>,
    callback: (args: Record<string, any>) => void
  ): Promise<void> {
    return this.axiosInstance
      .request({
        method: "POST",
        url: `${process.env.REACT_APP_API_BASE_URL}${path}`,
        responseType: "json",
        data: payload,
      })
      .then((reponse: AxiosResponse) => callback(reponse.data))
  }

  put(
    path: string,
    payload: Array<Record<string, any>> | Record<string, any>,
    callback: (args: Record<string, any>) => void
  ): Promise<void> {
    return this.axiosInstance
      .request({
        method: "PUT",
        url: `${process.env.REACT_APP_API_BASE_URL}${path}`,
        responseType: "json",
        data: payload,
      })
      .then((reponse: AxiosResponse) => callback(reponse.data))
  }

  patch(
    path: string,
    payload: Array<Record<string, any>> | Record<string, any>,
    callback: (args: Record<string, any>) => void
  ): Promise<void> {
    return this.axiosInstance
      .request({
        method: "PATCH",
        url: `${process.env.REACT_APP_API_BASE_URL}${path}`,
        responseType: "json",
        data: payload,
      })
      .then((reponse: AxiosResponse) => callback(reponse.data))
  }
}

export default new Axios()
