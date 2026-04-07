import axios from "axios";


export const groqCloudClient = axios.create({
    baseURL: "https://api.groq.com/openai/v1",
    headers: {
        "Content-Type": "application/json",
    },
})

groqCloudClient.interceptors.request.use((config) => {
    const apiKey = process.env.GROQ_CLOUD_API_KEY
    if (apiKey) {
        config.headers.Authorization = `Bearer ${apiKey}`
    }
    return config
});
