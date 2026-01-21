import { CACHE_MANAGER } from '@nestjs/cache-manager'
import {
  Injectable,
  UnauthorizedException,
  Inject,
} from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import type { Cache } from 'cache-manager'
import type { Request } from 'express'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {
    super({
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,

      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req?.cookies?.access_token,

        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
    })
  }

  async validate(req: Request, payload: any) {
    const token =
      req.cookies?.access_token ||
      req.headers.authorization?.split(' ')[1]

    if (!token) {
      throw new UnauthorizedException('Missing token')
    }

    const isBlacklisted = await this.cache.get(`bl:${token}`)
    if (isBlacklisted) {
      throw new UnauthorizedException('Token revoked')
    }

    return payload
  }
}
