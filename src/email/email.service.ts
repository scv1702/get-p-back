// 라이브러리 등록
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { randomBytes } from 'crypto';
import { createTransport } from 'nodemailer';

import { config } from '../config';

// 스키마 등록
import { Email, EmailDocument } from './schemas/email.schema';

// Data Transfer Object 등록
import { CreateEmailDto } from './dto/create-email.dto';

const transporter = createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  secure: true, // 다른 port를 사용해야 되면 false 값을 주어야 합니다.
  port: 465, // google mail server port
  auth: {
    user: config.MAIL_ADDRESS,
    pass: config.MAIL_PASSWORD,
  },
});

@Injectable()
export class EmailService {
  constructor(
    @InjectModel(Email.name) private emailModel: Model<EmailDocument>,
  ) {}

  async findOne(address: string): Promise<Email> {
    const email = this.emailModel.findOne({ address });
    return email;
  }

  // 이메일 도큐먼트 생성
  async create(email): Promise<Email> {
    const createdEmail = new this.emailModel(email);
    return createdEmail.save();
  }

  // 이메일 검증 코드 생성
  createVerifyCode(): string {
    const buf = randomBytes(64);
    const code = buf.toString('base64url');
    return code;
  }

  // 이메일 발송
  async _send(email: Email) {
    await transporter.sendMail({
      from: `"Get-P" <${config.MAIL_ADDRESS}>`,
      to: email.address,
      subject: `[Get-P] 이메일 인증`,
      html: `<p>인증을 완료해주세요</p>
              <p><a href="http://localhost:8080/users/verify/?address=${email.address}&code=${email.code}">인증하기</a></p>`,
    });
  }

  // 이메일 발송 요청 처리
  async send(createEmailDto: CreateEmailDto) {
    const { address } = createEmailDto;
    const code = this.createVerifyCode();
    const email = await this.create({ address, code });
    await this._send(email);
  }
}
