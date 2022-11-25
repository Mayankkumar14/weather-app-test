export interface IWeatherProps {
  cityName: string;
}

interface IForcastMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface IForcastWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface IForcastCloud {
  all: number;
}

interface ICloud {
  speed: number;
  deg: number;
  gust: number;
}

export interface IForcast {
  dt: number;
  main: IForcastMain;
  weather: [IForcastWeather];
  clouds: IForcastCloud;
  wind: ICloud;
  visibility ?: number;
  pop?: number;
  sys?: any;
  dt_txt?: string;
}

interface ICurrentWeatheData {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface ICurrentWeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface ICurrentWeatherWind {
  speed: number;
  deg: number;
}

interface ICurrentWeatherCloud {
  all: number;
}

export interface ICurrentWeather {
  coord?: any;
  weather: [ICurrentWeatheData];
  base: string;
  main: ICurrentWeatherMain;
  visibility: number;
  wind: ICurrentWeatherWind;
  clouds: ICurrentWeatherCloud;
  dt?: any;
  sys?: any;
  timezone?: any;
  id?: any;
  name?: any;
  cod?: any;
}

export interface IError {
  error: null | boolean;
}

export interface IHomeState {
  city: string
}

export interface IHomeProps {}

interface ICommonAPIState extends IError {
  loading: boolean;
}

export interface IForcastDataList {
  list: [IForcast] | null 
}

export interface IWeatherData extends ICommonAPIState {
  data: IForcastDataList | null;
}

export interface ITodayWeatherData extends ICommonAPIState {
  data: ICurrentWeather | null;
}

export interface IWeatherState {
  weatherData: IWeatherData;
  refresh: boolean;
  todayWeatherData: ITodayWeatherData;
}

export type MyCityState = {
  city: string;
}

export type SnackbarProps = {
  openSnackbar: boolean;
}

export type SnackbarState = {
  open: boolean;
}
