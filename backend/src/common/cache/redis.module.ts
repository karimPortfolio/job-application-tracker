import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { redisStore } from 'cache-manager-redis-store'

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      ttl: 60 * 1000, // 60s
    }),
  ],
})
export class RedisCacheModule {}
