import axios from 'axios'
const api_key = import.meta.env.VITE_OPENWEATHER_KEY
const getWeather = (latitude, longitude) => {
  const req = axios.get(`$https://api.openweathermap.org/data/2.5/weather/?lat=${latitude}&lon=${longitude}&appid=${api_key}`)
  return req.then(request => request.data)
}
export {getWeather}