import type { AxiosInstance } from 'axios'
import * as AxiosLogger from 'axios-logger'

export default (axiosClient: AxiosInstance) => {
  axiosClient.interceptors.request.use(
    AxiosLogger.requestLogger,
    AxiosLogger.errorLogger,
  )
  axiosClient.interceptors.response.use(undefined, AxiosLogger.errorLogger)
}
