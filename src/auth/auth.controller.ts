// 라이브러리 등록
import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// 서비스 등록
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // 로그인
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // 이메일 검증
  @Get('verify')
  async verify(@Query('address') address: string, @Query('code') code: string) {
    await this.authService.verify(address, code);
  }
}
