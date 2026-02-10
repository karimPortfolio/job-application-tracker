import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import * as redisStore from 'cache-manager-redis-store'
import Redis from 'ioredis'

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        const redis = new Redis({
          host: process.env.REDIS_HOST || 'localhost',
          port: Number(process.env.REDIS_PORT) || 6379,
        })

        return {
          store: redisStore,
          redisInstance: redis,
          ttl: 60 * 1000, // 60 seconds
        }
      },
    }),
  ],
})
export class RedisCacheModule {}
