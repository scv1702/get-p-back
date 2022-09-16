// 라이브러리 등록
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Company } from 'src/company/schemas/company.schema';
import { People } from 'src/people/schemas/people.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: Types.ObjectId;

  // 이메일
  @Prop({
    required: true,
    trime: true,
    unique: true,
  })
  email: string;

  // 비밀번호
  @Prop({
    required: true,
    trim: true,
    select: false,
  })
  password: string;

  @Prop({
    required: true,
    select: false,
  })
  salt: string;

  // 이메일 검증 유무
  @Prop({
    required: true,
    select: false,
    default: false,
  })
  verify: boolean;

  @Prop()
  category: string;

  @Prop({ type: Types.ObjectId, ref: 'People' })
  peopleObjectId: People;

  @Prop({ type: Types.ObjectId, ref: 'Company' })
  companyObjectId: Company;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
