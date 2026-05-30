import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-ioredis-yet';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        const store = await redisStore({
          host: process.env.REDIS_HOST || "localhost",
          port: Number(process.env.REDIS_PORT) || 6379,
        });

        return {
          store: store,
          ttl: 60 * 1000, // 60 seconds
        };
      },
    }),
  ],
})
export class RedisCacheModule {}
