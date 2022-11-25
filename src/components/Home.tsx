import { Component } from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

import { IHomeState, IHomeProps } from '../utils/types'
import { CITY_NAMES } from '../utils/constant'

import Weather from './Weather'
import { getURLParam, isCityExist } from '../utils/helper'
import './common.less'

export default class Home extends Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props)  
    this.state = {
      city: this.getCityName() || CITY_NAMES.OTTAWA,  
    }
  }

  getCityName = () => {
    const cityName: string = getURLParam('city')
    if (cityName && cityName.trim() && isCityExist(cityName)) {
      return cityName
    }
  }

  render() {
  
    return (
      <div className='home-container'>
        <div>
          {Object.values(CITY_NAMES).map((cityName: string) => (
            <span
              key={cityName}
            >
              <Link
                style={{ textDecoration: 'none' }}
                to={`search?city=${cityName}`}>
                <Button
                  variant='text'
                  onClick={() => { this.setState({ city: cityName }) }}
                  className={`header-button ${cityName}`}
                >
                  <span 
                    className={`${cityName === this.state.city ? 'active' : ''}`}
                  >
                    {cityName}
                  </span>
                </Button>
              </Link>
            </span>
          )
          )}
        </div>
        <div className='weather-container'>
          <Weather
            cityName={this.state.city}
          />
        </div>
      </div>
    )
  }
}
