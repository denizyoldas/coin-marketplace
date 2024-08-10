import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_BINANCE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

API.interceptors.request.use(
  (config) => {
    config.headers['X-MBX-APIKEY'] = import.meta.env.VITE_BINANCE_API_KEY

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default API
