// 라이브러리 등록
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

// 스키마 등록
import { User } from './schemas/user.schema';

// 서비스 등록
import { UsersService } from './users.service';

@ApiTags('사용자')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 전체 사용자 목록 조회
  @Get()
  async findAll(): Promise<Array<User>> {
    const users = await this.usersService.findAll();
    return users;
  }
}
