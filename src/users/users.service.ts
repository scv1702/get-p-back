// 라이브러리 등록
import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
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

  // 전체 사용자 조회
  async findAll(): Promise<Array<User>> {
    return await this.userModel.find({});
  }

  // 사용자 조회
  async findOne(queries: object = {}, options: object = {}): Promise<User> {
    return await this.userModel.findOne(queries).select(options);
  }

  // 회원가입 요청 처리
  async signUp(
    email: string,
    password: string,
    category: string,
  ): Promise<User> {
    const user = await this.findOne({ email });
    if (!user) {
      // this.emailService.send(email);
      return await this._signUp(email, password, category);
    }
    throw new ForbiddenException(
      '이미 가입된 이메일 입니다. 다른 이메일을 입력해주세요.',
    );
  }

  // 사용자 생성
  async create(user: any): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  // 이메일 검증
  async verify(userId: string) {
    await this.userModel.findByIdAndUpdate(
      userId,
      { verify: true },
      { new: true },
    );
  }

  // 회원가입
  _signUp(email: string, password: string, category: string): Promise<User> {
    return new Promise((resolve, _) => {
      // salt 값 생성
      randomBytes(64, (err, buf) => {
        if (err) {
          throw new InternalServerErrorException(
            '회원 가입에 문제가 생겼습니다. 다시 시도해주세요.',
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
              throw new InternalServerErrorException(
                '회원 가입에 문제가 생겼습니다. 다시 시도해주세요.',
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

  // 사용자 탈퇴
  async delete(userID: string) {
    await this.userModel.findByIdAndRemove(userID);
  }
}
