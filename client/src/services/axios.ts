import axios, {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosError,
} from "axios"
import { message } from "antd"

// export const axiosInstance = axios.create({
//   baseURL: process.env.REACT_APP_API_BASE_URL,
// })

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
        message.success(`${response.data.status}: ${response.data.message}`)
        break
    }
    return Promise.resolve(response)
  }

  handleErrorResponse(error: AxiosError) {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          message.error(`${error.response.data.message}`)
          break
        case 401:
          message.error(`${error.response.data.message}`)
          window.location.href = "/"
          break
        case 403:
          message.error(`${error.response.data.message}`)
          break
        case 404:
          message.error(`${error.response.data.message}`)
          break
        case 500:
          message.error(`${error.response.data.message}`)
          break
        default:
          message.error(
            `${error.response.statusText}: ${error.response.statusText}`
          )
          break
      }
    }
  }

  get(
    path: string,
    callback: (args: Array<Record<string, any>> | []) => void
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
    payload: Array<Record<string, any>>,
    callback: (args: Array<Record<string, any>> | []) => void
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
    payload: Array<Record<string, any>>,
    callback: (args: Array<Record<string, any>> | []) => void
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
    payload: Array<Record<string, any>>,
    callback: (args: Array<Record<string, any>> | []) => void
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

// axiosInstance.interceptors.request.use(async (requestConfig: AxiosRequestConfig | any) => {
//   const token = await localStorage.getItem("token")
//   config.headers['Content-Type'] = 'application/json; charset=utf-8';
//         config.headers['Access-Control-Allow-Origin'] = '*';
//         config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS';
//         config.headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, X-Auth-Token';
//         config.headers['Accept'] = 'application/json';
//         config.headers['Cache-Control'] = 'max-age=31536000';
//   if (token) {
//   requestConfig.headers.common['auth-access'] = token
//   }
//   return requestConfig
// }, (error) => {
//   return Promise.reject(error)
// })

// axiosInstance.interceptors.response.use(
//   (res) => {
//     return res.data
//   },
//   (err) => {
//     if (process.env.NODE_ENV !== "production") {
//       console.log(err.response?.data)
//     }
//     throw err.response?.data || err.response || err.message
//   }
// )

export default new Axios()
