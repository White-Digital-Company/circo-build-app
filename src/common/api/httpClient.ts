import axios from 'axios'
import qs from 'qs'
import applyLoggerInterceptor from './interceptors/logger'

const httpClient = axios.create({
  baseURL: 'https://id.gs1.se/',
  paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' }),
})

applyLoggerInterceptor(httpClient)

export default httpClient
