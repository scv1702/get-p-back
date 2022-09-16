import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { People } from 'src/people/schemas/people.schema';
import { Project } from 'src/projects/schemas/project.schema';

export type HashtagDocument = Hashtag & Document;

@Schema()
export class Hashtag {
  _id: Types.ObjectId;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  color: string;

  @Prop({ type: Types.ObjectId, ref: 'People' })
  peopleObjectIds: [People];

  @Prop({ type: Types.ObjectId, ref: 'Project' })
  projectObjectIds: [Project];
}

export const HashtagSchema = SchemaFactory.createForClass(Hashtag);
