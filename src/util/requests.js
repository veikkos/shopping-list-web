import axios from 'axios'

const url = process.env.REACT_APP_BACKEND_URL

const headers = token => ({
  Authorization: `Bearer ${token}`
})

const parameters = token => ({
  headers: headers(token)
})

export const List = {
  GET: (token, id) => axios.get(`${url}/lists?id=${id}`, parameters(token)),

  PUT: (token, list) => axios.put(`${url}/lists?id=${list.id}`, list, parameters(token)),

  DELETE: (token, id) => axios.delete(`${url}/lists?id=${id}`, parameters(token))
}

export const Lists = {
  GET: token => axios.get(`${url}/lists`, parameters(token)),

  POST: (token, name) => axios.post(`${url}/lists`, {
    name,
    products: []
  }, parameters(token)),
}

export const Product = {
  GET: (token, id) => axios.get(`${url}/products?id=${id}`, parameters(token))
}

export const Products = {
  GET: token => axios.get(`${url}/products`, parameters(token)),

  POST: (token, name) => axios.post(`${url}/products`, {
    name,
  }, parameters(token))
}

export const Shared = {
  GET: token => axios.get(`${url}/shared`, parameters(token)),

  POST: (token, lists) => axios.post(`${url}/shared`, {
    lists
  }, parameters(token))
}
