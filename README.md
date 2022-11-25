# weather-test-app

## Please follow the below steps to run the project
- npm i
- npm start

## Technology Used:
- React [Class component only]
- LESS  [For styling]

## Some notes:
- I'm using openWeather 3rd party API for fetching the weather data.

- For fetching the same day weather and previous day historic data, I'm using following APIs:
  - https://api.openweathermap.org/data/2.5//weather?q=TOKYO&appid=My_API_KEY&units=metric [For Fetching historic data]

  - https://api.openweathermap.org/data/2.5/forecast?appid=My_API_KEY&q=TOKYO&units=metric [For Fetching historic data]

- I have added one icon to refresh the current day weather data.

- Address bar with respective city name is also updated whenever user selects any city. It would be good if user want to share the link. 
  i.e http://localhost:3000/search?city=OTTAWA

- We are displying the weather data only for three cities i.e TOKYO, OTTAWA and MOSCOW.

## Some Enhancement points:
- We can implement cache to reduce the API calling because weather data is not frequenctly changing.
