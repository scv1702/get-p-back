// 라이브러리 등록
import { Controller, Get, Post, Query } from '@nestjs/common';

// 스키마 등록
import { User } from './schemas/user.schema';

// 서비스 등록
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 전체 사용자 목록 조회
  @Get()
  async findAll(): Promise<Array<User>> {
    const users = await this.usersService.findAll();
    return users;
  }

  // 로그인
  @Post('signin')
  signin() {}

  // 이메일 검증
  @Get('verify')
  async verify(@Query('address') address: string, @Query('code') code: string) {
    await this.usersService.verify(address, code);
  }
}
