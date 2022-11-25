import axiosInstance from './axios'
import { IWeatherData, ITodayWeatherData } from '../utils/types'

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY as string

class GetWeatherDetails {

  static getWeatherForcast = async (cityName: string): Promise<IWeatherData> =>  { 
    try {
      const response = await axiosInstance.get(`/forecast?appid=${API_KEY}&q=${cityName}&units=metric`)
      return { data: response.data } as IWeatherData
    } catch (error) {
      console.log('Error while fetching the weather forcast details', error)
      return { error: true } as IWeatherData
    }
  }

  static getCurrentWeatherForcast = async (cityName: string): Promise<ITodayWeatherData> => {
    try {
      const response = await axiosInstance.get(`/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
      return { data: response.data } as ITodayWeatherData
    } catch (error) {
      console.log('Error while fetching the current weather details', error)
      return { error: true } as ITodayWeatherData
    }
  }
}

export default GetWeatherDetails
