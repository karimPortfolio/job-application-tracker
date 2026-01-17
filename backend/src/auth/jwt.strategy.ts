import { CACHE_MANAGER } from '@nestjs/cache-manager'
import {
  Injectable,
  UnauthorizedException,
  Inject,
} from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import type { Cache } from 'cache-manager'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    })
  }

  async validate(req, payload) {
    const token = req.headers.authorization?.split(' ')[1]
    if (await this.cache.get(`bl:${token}`))
      throw new UnauthorizedException()

    return payload
  }
}
