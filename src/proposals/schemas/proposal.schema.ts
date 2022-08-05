// 라이브러리 등록
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

// 스키마 등록
import { People } from 'src/people/schemas/people.schema';
import { Project } from 'src/projects/schemas/project.schema';

export type ProposalDocument = Proposal & Document;

@Schema()
export class Proposal {
  _id: Types.ObjectId;

  // 프로젝트 ID
  @Prop({ type: Types.ObjectId, ref: 'Project', required: true })
  project: Project;

  // 제안자(해당 프로젝트 수행을 원하는 피플)
  @Prop({ type: Types.ObjectId, ref: 'People', required: true })
  proponent: People;

  @Prop({ required: true })
  description: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const ProposalSchema = SchemaFactory.createForClass(Proposal);
