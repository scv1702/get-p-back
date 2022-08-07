// 라이브러리 등록
import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// 스키마 등록
import { User } from 'src/users/schemas/user.schema';

export type CompanyDocument = Company & Document;

@Schema()
export class Company {
  _id: Types.ObjectId;

  // 기업명
  @Prop({ required: true })
  name: string;

  // @Prop()
  // 기업 프로필 사진
  // companyImage: string;

  // 업종
  @Prop({ required: true })
  industry: string;

  // 대표자
  @Prop({ required: true })
  ceo: string;

  // 기업 소개
  @Prop()
  introduction: string;

  // 대표 전화
  @Prop({ required: true })
  phoneNumber: string;

  // 웹 사이트
  @Prop()
  url: string;

  // 기업 주소
  @Prop({ required: true })
  address: string;

  // 계정
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userObjectId: User;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
