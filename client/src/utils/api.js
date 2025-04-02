import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  }
})

export const testing = async () => {
  api.get('http://localhost:8080').then((response) => {
    console.log(response)
  }).catch((error) => {
    console.error('Error fetching data:', error)
  })
}