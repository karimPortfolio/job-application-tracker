"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.groqCloudClient = void 0;
const axios_1 = __importDefault(require("axios"));
exports.groqCloudClient = axios_1.default.create({
    baseURL: "https://api.groq.com/openai/v1",
    headers: {
        "Content-Type": "application/json",
    },
});
exports.groqCloudClient.interceptors.request.use((config) => {
    const apiKey = process.env.GROQ_CLOUD_API_KEY;
    if (apiKey) {
        config.headers.Authorization = `Bearer ${apiKey}`;
    }
    return config;
});
//# sourceMappingURL=groqcloud.client.js.map