import { Component } from 'react'

import { 
  Card, 
  CardContent, 
  CircularProgress, 
  Typography, 
  Grid, 
  Tooltip
} from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faS, faCloud, faSun, faCloudRain } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import RefreshIcon from '@mui/icons-material/Refresh'

import ApiCalls from '../services/GetWeatherDetails'
import CustomSnackbar from '../services/CustomSnackbar'

import { IWeatherProps, IWeatherState, ICurrentWeather } from '../utils/types'

import { MESSAGES, RAIN_TYPES } from '../utils/constant'
import { capitalizeFirstLetter, getURLParam, isCityExist } from '../utils/helper'

library.add(faS, faCloud, faSun, faCloudRain)

const days = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
]


export default class Weather extends Component<IWeatherProps, IWeatherState> {
  rainTypes: string[]
  day: number

  constructor(props: IWeatherProps) {
    super(props)
    this.state = {
      todayWeatherData: {
        loading: true,
        data: null,
        error: null,
      },
      weatherData: {
        loading: true,
        data: null,
        error: null,
      },
      refresh: false,
    }

    this.rainTypes = [
      RAIN_TYPES.LIGHT_RAIN, 
      RAIN_TYPES.MODERATE_RAIN, 
      RAIN_TYPES.HEAVY_INTENSITY_RAIN
    ]

    this.day = new Date().getDay()
  }

  getWeatherForcastData = async (cityName: string) => {
    const { weatherData } = this.state
    const { data, error } = await ApiCalls.getWeatherForcast(cityName)
    if (error) {
      this.setState({
        weatherData: {
          ...weatherData,
          error: true,
          loading: false,
          data: null
        }
      })
    } else {
      this.setState({
        weatherData: {
          ...weatherData,
          data,
          loading: false,
          error: null
        }
      })
    } 
  }

  getCurrentWeatherForcastData = async (cityName: string) => {
    const { todayWeatherData } = this.state
    const { data, error } = await ApiCalls.getCurrentWeatherForcast(cityName)
    if (data) {
      this.setState({
        todayWeatherData: {
          ...todayWeatherData,
          data,
          loading: false,
          error: null
        }
      })
    } else {
      this.setState({
        todayWeatherData: {
          ...todayWeatherData,
          error,
          loading: false,
          data: null
        }
      })
    }
    this.setState({ refresh: false })
  }

  componentDidMount() {
    this.getWeatherForcastData(this.props.cityName)
    this.getCurrentWeatherForcastData(this.props.cityName)

    const cityName: string = getURLParam('city')

    if (!isCityExist(cityName)) {
      const url = new URL('/search', window.location.origin)
      url.searchParams.set('city', this.props.cityName)
      window.history.pushState({}, '', url)
    }
  }

  componentDidUpdate(prevProps: any) {
    if (this.state.refresh) {
      this.getCurrentWeatherForcastData(this.props.cityName)
    }
    if (prevProps.cityName !== this.props.cityName) {
      this.getWeatherForcastData(this.props.cityName)
      this.getCurrentWeatherForcastData(this.props.cityName)
    }
  }

  handleRefreshIcon = () => {
    this.setState({ refresh: true })
  }

  getForcastIcon = (index: number): any => {
    const historyData = this.state.weatherData 
    const icon = (historyData?.data?.list?.[(index) * 8]?.weather[0]?.description || '')
    const isSunExist = (historyData?.data?.list?.[(index) * 8]?.clouds?.all === 0)
    return (this.rainTypes.includes(icon) 
            ? ['fas', 'cloud-rain']
            :  isSunExist ? ['fas', 'sun'] : ['fas', 'cloud'])
  }

  getCurrentWeatherIcon = (data: ICurrentWeather): any => {
    const isRainyCloud = this.rainTypes.includes(data.weather[0].description)
    return (
            isRainyCloud 
            ? ['fas', 'cloud-rain']
             : (data.clouds.all === 0) 
                ? ['fas', 'sun'] 
                : ['fas', 'cloud']
            )
  }

  render() {
    const currentData = this.state.todayWeatherData 
    const historyData = this.state.weatherData 

    return (
      <>
        {(currentData.error || historyData.error) && (
          <CustomSnackbar
            openSnackbar={true} />
        )}

        {(currentData.loading || historyData.loading) && (
          <CircularProgress />
        )}

        {(currentData.data && historyData.data) && (
          <>
            <Card className='card-container'>
              <Grid container spacing={1} className='top-card-container'>
                <Grid item xs={12} md={12} className='top-card'>
                  <CardContent className='card-container padding-0'>
                    <Typography 
                      gutterBottom 
                      variant="h4" 
                      component="div" 
                      className='title-text'
                    >
                      Today

                      <Tooltip
                        title={
                          <h3>
                            {MESSAGES.REFRESH}
                          </h3>
                        }
                        placement="right"
                      >
                        <RefreshIcon
                          className={`refresh-icon ${this.state.refresh ? 'rotateIcon' : null}`}
                          onClick={this.handleRefreshIcon}
                        />
                      </Tooltip>
                    </Typography>
                    {historyData?.data?.list?.slice(0, 1).map((data: any) => (
                      <div
                        className='weather-detail'
                        key={data.weather[0].description}
                      >
                        <FontAwesomeIcon
                          className='top-cloud-icon'
                          icon={this.getCurrentWeatherIcon(data)}
                        />
                        <div>
                          <Typography 
                            gutterBottom 
                            variant="h2" 
                            component="div" 
                            className='number-text'
                          >
                            {currentData?.data?.main?.temp}&deg;
                          </Typography>
                          <Typography gutterBottom variant="h4" component="div">
                            {capitalizeFirstLetter(data.weather[0].description)}
                          </Typography>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Grid>
              </Grid>
              <Grid container spacing={1} className='bottom-card-container'>
                {days?.slice(0, 4)?.map((day: string, index: number) => (
                  <Grid key={day} item xs={6} md={3} className='bottom-card'>
                    <CardContent className='card-container padding-0'>
                      <Typography 
                        gutterBottom 
                        variant="h5" 
                        className='day-text' 
                        component="div"
                      >
                        {days[(this.day + ++index) % 7]}
                      </Typography>
                      <FontAwesomeIcon
                        className='bottom-cloud-icon'
                        icon={this.getForcastIcon(index)}
                      />
                      <Typography
                        gutterBottom
                        variant="h4"
                        component="div"
                        className='number-text'>
                        {historyData?.data && historyData?.data.list?.[(index) * 8]?.main?.temp}&deg;
                      </Typography>
                    </CardContent>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </>
        )}
      </>
    )
  }
}
