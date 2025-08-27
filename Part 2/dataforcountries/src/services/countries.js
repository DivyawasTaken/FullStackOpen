import axios from 'axios'
const getCountries = () => {
  const req = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
  return req.then(res => res.data)
}
export {getCountries}