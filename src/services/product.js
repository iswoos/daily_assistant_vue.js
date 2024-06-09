import axios from 'axios'

/**
 * @param {number} page
 */
export const getProduct = (page) => {
  return axios.get(`https://reqres.in/api/users?page=${page}`)
}

export const getTestString = () => {
  return axios.get('http://localhost:8081/test2')
}
