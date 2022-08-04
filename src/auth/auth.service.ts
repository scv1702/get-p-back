// 라이브러리 등록
import { Injectable } from '@nestjs/common';
import { pbkdf2Sync } from 'crypto';

// 서비스 등록
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  // 이메일 및 비밀번호 유효성 검사
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email, { salt: 1 });
    if (user) {
      const key = pbkdf2Sync(password, user.salt, 100000, 64, 'sha512');
      const findedUser = await this.usersService.find({
        email,
        password: key.toString('base64'),
        verify: true,
      });
      if (findedUser) {
        return findedUser;
      }
    }
    return null;
  }
}
