import axios from "axios"
import { parseCookies } from "nookies"

export function getAPIClient(ctx?: any) {
  const api = axios.create({
    baseURL: 'http://localhost:3333'
  })
  
  const { 'jwtest.token': token  } = parseCookies(ctx)
  
  if(token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`
  }

  return api;
} 