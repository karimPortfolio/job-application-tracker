import axios from "axios"

export const openRouterClient = axios.create({
  baseURL: "https://openrouter.ai/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
})

openRouterClient.interceptors.request.use((config) => {
  const apiKey = process.env.OPENROUTER_API_KEY
  if (apiKey) {
    config.headers.Authorization = `Bearer ${apiKey}`
  }
  return config
})
