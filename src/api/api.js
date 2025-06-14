import axios from "axios"

const api = axios.create({
  //baseURL: "https://api.cinerate.bbzwinf.ch",
  baseURL: "http://localhost:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
})

export default api