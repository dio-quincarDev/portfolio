import { boot } from 'quasar/wrappers'
import axios from 'axios'

const API_CONSTANTS = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  FEATURE_FLAGS: '/api/feature-flags',
  AUTH: '/api/feature-flags/auth',
  LOGIN: '/api/feature-flags/auth/login',
  REGISTER: '/api/feature-flags/auth/register',
}

const api = axios.create({
  baseURL: API_CONSTANTS.BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json, text/plain, */*',
  },
})

function isValidToken(token) {
  return !!token
}

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token && isValidToken(token)) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      console.error('Acceso denegado: permisos insuficientes.')
    } else if (error.response) {
      console.error(`Error ${error.response.status}: ${error.response.statusText}`)
    } else {
      console.error('Error en la solicitud:', error.message)
    }
    return Promise.reject(error)
  },
)

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios
  app.config.globalProperties.$api = api
})

export { api, API_CONSTANTS }