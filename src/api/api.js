import axios from "axios"

const api = axios.create({
  baseURL: "https://api.cinerate.bbzwinf.ch",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
})

export default api