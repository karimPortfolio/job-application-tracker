"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.openRouterClient = void 0;
const axios_1 = __importDefault(require("axios"));
exports.openRouterClient = axios_1.default.create({
    baseURL: "https://openrouter.ai/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});
exports.openRouterClient.interceptors.request.use((config) => {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (apiKey) {
        config.headers.Authorization = `Bearer ${apiKey}`;
    }
    return config;
});
//# sourceMappingURL=openrouter.client.js.map