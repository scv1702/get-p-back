// 라이브러리 등록
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { pbkdf2Sync } from 'crypto';

// 서비스 등록
import { UsersService } from 'src/users/users.service';
import { EmailService } from 'src/email/email.service';

// 스키마 등록
import { User } from 'src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private emailService: EmailService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // 이메일 및 비밀번호 유효성 검사
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOneByEmail(email, { salt: 1 });
    if (user) {
      const key = pbkdf2Sync(password, user.salt, 100000, 64, 'sha512');
      const findedUser = await this.usersService.find({
        email,
        password: key.toString('base64'),
      });
      if (findedUser) {
        return findedUser;
      }
    }
    return null;
  }

  // JWT 발급
  async login(user: User) {
    const payload = {
      _id: user._id,
      email: user.email,
      category: user.category,
    };
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  // 이메일 검증
  async verify(address: string, code: string) {
    const email = await this.emailService.findOne(address);
    if (code !== email.code) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: '이메일 인증에 문제가 생겼습니다. 다시 시도해주세요.',
        },
        HttpStatus.FORBIDDEN,
      );
    } else {
      let user = await this.usersService.findOneByEmail(address);
      user.verify = true;
      await user.save();
      return { message: '이메일 인증에 성공했습니다.' };
    }
  }
}
