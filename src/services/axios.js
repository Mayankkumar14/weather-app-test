import axios from 'axios'

export const baseURL = 'https://api.openweathermap.org/data/2.5'

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
  }
})

export default axiosInstance
