import { CITY_NAMES } from "./constant"

export const capitalizeFirstLetter = (description: string) => {
  return description.charAt(0).toUpperCase() + description.slice(1)
}

export const getURLParam = (param: string) => {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(param) || ''
}

export const isCityExist = (city: string) => {
  return Object.values(CITY_NAMES).includes(city.toUpperCase())
}
