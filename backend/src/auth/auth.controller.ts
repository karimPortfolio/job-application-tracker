import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Req,
  Res,
  UseGuards,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import type { Response } from 'express';
import type { Request } from 'express';
import { GoogleAuthGuard } from './google-auth.guard';
import type { GoogleProfilePayload } from './google.strategy';

@Controller({
  path: 'auth',
  version: VERSION_NEUTRAL,
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Headers('x-client-type') clientType: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.register(dto);

    if (clientType === 'mobile') {
      return { accessToken };
    }

    res.cookie(process.env.COOKIE_NAME || 'access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return { message: 'Registered successfully' };
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Headers('x-client-type') clientType: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.login(dto);

    if (clientType === 'mobile') {
      return { accessToken };
    }

    res.cookie(process.env.COOKIE_NAME || 'access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return { message: 'Logged in successfully' };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {
    // Guard redirects to Google
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(
    @Req() req: Request & { user: GoogleProfilePayload },
    @Headers('x-client-type') clientType: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.handleGoogleLogin(req.user);

    if (clientType === 'mobile') {
      return { accessToken };
    }

    res.cookie(process.env.COOKIE_NAME || 'access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return res.redirect(process.env.FRONTEND_URL || 'http://localhost:3000');
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req, @Res({ passthrough: true }) res: Response) {
    const cookieName = process.env.COOKIE_NAME || 'access_token';
    const token = req.cookies?.[cookieName] || req.headers.authorization?.split(' ')[1];

    if (token) {
      await this.authService.logout(token);
    }

    res.clearCookie(cookieName);
    return { message: 'Logged out successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@CurrentUser() user: any) {
    return this.authService.me(user.sub);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    await this.authService.sendResetPasswordEmail(dto);

    return {
      message: 'If the email exists, a reset link has been sent.',
    };
  }

  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    await this.authService.resetPassword(dto);

    return {
      message: 'Password reset successfully',
    };
  }
}
