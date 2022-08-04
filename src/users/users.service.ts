// 라이브러리 등록
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { randomBytes, pbkdf2 } from 'crypto';

// 스키마 등록
import { User, UserDocument } from './schemas/user.schema';

// 서비스 등록
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private emailService: EmailService,
  ) {}

  // 사용자 목록 조회
  async findAll(): Promise<Array<User>> {
    const users = await this.userModel.find({});
    return users;
  }

  // 특성 이메일을 가진 사용자 조회
  async findOneByEmail(email: string, options: object = {}) {
    const user = await this.userModel.findOne({ email }).select(options);
    return user;
  }

  async find(options: object = {}) {
    const users = await this.userModel.find(options);
    return users;
  }

  // 회원가입 요청 처리
  async signUp(email: string, password: string, category: string) {
    const user = await this.findOneByEmail(email);
    if (!user) {
      const createdUser = await this._signUp(email, password, category);
      this.emailService.send({ address: email });
      return createdUser;
    } else {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: '이미 가입된 이메일 입니다. 다른 이메일을 입력해주세요.',
        },
        HttpStatus.FORBIDDEN,
      );
    }
  }

  // 사용자 도큐먼트 생성
  async create(user) {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  // 회원가입
  _signUp(email: string, password: string, category: string): Promise<User> {
    return new Promise((resolve, _) => {
      // salt 값 생성
      randomBytes(64, (err, buf) => {
        if (err) {
          throw new HttpException(
            {
              status: HttpStatus.INTERNAL_SERVER_ERROR,
              error: '회원 가입에 문제가 생겼습니다. 다시 시도해주세요.',
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
        // 비밀번호 암호화
        pbkdf2(
          password,
          buf.toString('base64'),
          100000,
          64,
          'sha512',
          async (err, key) => {
            if (err) {
              throw new HttpException(
                {
                  status: HttpStatus.INTERNAL_SERVER_ERROR,
                  error: '회원 가입에 문제가 생겼습니다. 다시 시도해주세요.',
                },
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
            }
            const user = await this.create({
              email,
              password: key.toString('base64'),
              salt: buf.toString('base64'),
              category,
            });
            resolve(user);
          },
        );
      });
    });
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
      let user = await this.findOneByEmail(address);
      user.verify = true;
      await user.save();
    }
  }
}
