// 라이브러리 등록
import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Query,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// 서비스 등록
import { AuthService } from './auth.service';
import { EmailService } from 'src/email/email.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private emailService: EmailService,
  ) {}

  // 로그인
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // 이메일 검증
  @Get('verify')
  async verify(@Query('address') address: string, @Query('code') code: string) {
    const email = await this.emailService.findOne(address);
    if (code === email.code) {
      return await this.authService.verify(address);
    }
    throw new ForbiddenException(
      '이메일 인증에 문제가 생겼습니다. 다시 시도해주세요.',
    );
  }
}
