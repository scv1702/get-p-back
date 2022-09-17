// 라이브러리 등록
import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CompanyDocument = Company & Document;

@Schema()
export class Company {
  _id: Types.ObjectId;

  // 기업명
  @Prop({ required: true })
  name: string;

  // 프로필 사진
  @Prop()
  image: string;

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
}

export const CompanySchema = SchemaFactory.createForClass(Company);
