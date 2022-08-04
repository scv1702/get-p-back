import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { User } from 'src/users/schemas/user.schema';
import { Project } from 'src/projects/schemas/project.schema';

export type PeopleDocument = People & Document;

@Schema()
export class People {
  _id: Types.ObjectId;

  // 프로젝트 참여 횟수
  @Prop({ default: 0, required: true })
  participation: number;

  // 프로젝트 성공 횟수
  @Prop({ default: 0, required: true })
  success: number;

  // 총 보수
  @Prop({ default: 0, required: true })
  totalPay: number;

  // 출신 학교
  @Prop()
  school: string;

  // 전공
  @Prop()
  major: string;

  // 활동 지역
  @Prop({ required: true })
  activityArea: string;

  // 자기 소개
  @Prop()
  description: string;

  // 포트폴리오
  @Prop()
  portfolio: string;

  // 휴대폰 번호
  @Prop({ required: true })
  phoneNumber: string;

  // My 프로젝트
  @Prop({ type: Types.ObjectId, ref: 'Project' })
  projects: [Project];

  // 계정
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userObjectId: User;
}

export const PeopleSchema = SchemaFactory.createForClass(People);
