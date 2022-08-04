// 라이브러리 등록
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// 서비스 등록
import { EmailService } from './email.service';

// 스키마 등록
import { Email, EmailSchema } from './schemas/email.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Email.name, schema: EmailSchema }]),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
