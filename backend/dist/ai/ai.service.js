"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AIService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIService = void 0;
const common_1 = require("@nestjs/common");
const groqcloud_client_1 = require("./groqcloud.client");
let AIService = AIService_1 = class AIService {
    logger = new common_1.Logger(AIService_1.name);
    async run({ prompt, model = "llama-3.3-70b-versatile", temperature = 0.4, maxTokens = 800, feature = "generic", }) {
        const res = await groqcloud_client_1.groqCloudClient.post("/chat/completions", {
            model,
            messages: [
                {
                    role: "system",
                    content: "You are a professional HR assistant generating business-safe content.",
                },
                { role: "user", content: prompt },
            ],
            temperature,
            max_tokens: maxTokens,
        });
        return res.data.choices[0].message.content;
    }
};
exports.AIService = AIService;
exports.AIService = AIService = AIService_1 = __decorate([
    (0, common_1.Injectable)()
], AIService);
//# sourceMappingURL=ai.service.js.map