// 라이브러리 등록
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EmailDocument = Email & Document;

@Schema()
export class Email {
  _id: Types.ObjectId;

  // 이메일 주소
  @Prop({
    required: true,
    unique: true,
  })
  address: string;

  // 검증 코드
  @Prop({ required: true })
  code: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const EmailSchema = SchemaFactory.createForClass(Email);
