import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { Company } from 'src/company/schemas/company.schema';
import { People } from 'src/people/schemas/people.schema';
import { Proposal } from 'src/proposals/schemas/proposal.schema';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  _id: Types.ObjectId;

  // 해당 프로젝트 수행을 의뢰한 회사
  @Prop({ type: Types.ObjectId, ref: 'Company', required: true })
  requester: Company;

  // 받은 제안 리스트
  @Prop({ type: [Types.ObjectId], ref: 'Proposal' })
  proposals: [Proposal];

  // 받은 제안들 중에서 회사가 프로젝트를 수행하도록 고용한 people
  @Prop({ type: Types.ObjectId, ref: 'People' })
  performer: People;

  // 프로젝트 미팅 방식. 온라인: 0, 오프라인: 1
  @Prop({ required: true })
  meeting: number;

  // 성공 보수
  @Prop({ required: true })
  successPay: number;

  // 실패 보증금
  @Prop({ required: true })
  failDeposit: number;

  // 프로젝트 유형
  @Prop({ required: true })
  category: string;

  // 프로젝트 제목
  @Prop({ required: true })
  title: string;

  // 프로젝트 상세 설명
  @Prop({ required: true })
  description: string;

  // 첨부 파일 (첨부 파일 URL)
  @Prop()
  attachmentUrl: string;

  // 지원자 모집 마감일
  @Prop({ required: true })
  applicationDeadline: string;

  // 작업 마감일
  @Prop({ required: true })
  deadline: Date;

  // 작업 기간 (일 단위)
  @Prop({ required: true })
  duration: Date;

  // 프로젝트 태그 (최대 8개)
  @Prop({ required: true })
  tag: [string];

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
