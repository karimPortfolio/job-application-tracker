"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisCacheModule = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const cache_manager_ioredis_yet_1 = require("cache-manager-ioredis-yet");
let RedisCacheModule = class RedisCacheModule {
};
exports.RedisCacheModule = RedisCacheModule;
exports.RedisCacheModule = RedisCacheModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cache_manager_1.CacheModule.registerAsync({
                isGlobal: true,
                useFactory: async () => {
                    const store = await (0, cache_manager_ioredis_yet_1.redisStore)({
                        host: process.env.REDIS_HOST || "localhost",
                        port: Number(process.env.REDIS_PORT) || 6379,
                    });
                    return {
                        store: store,
                        ttl: 60 * 1000,
                    };
                },
            }),
        ],
    })
], RedisCacheModule);
//# sourceMappingURL=redis.module.js.map