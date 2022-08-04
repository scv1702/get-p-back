// 라이브러리 등록
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { LocalStrategy } from './local.strategy';

// 컨트롤러 등록
import { AuthController } from './auth.controller';

// 서비스 등록
import { AuthService } from './auth.service';

// 모듈 등록
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
