import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type EmailDocument = Email & Document;

@Schema()
export class Email {
  _id: Types.ObjectId;

  @Prop({
    required: true,
    unique: true,
  })
  address: string;

  @Prop({ required: true })
  code: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const EmailSchema = SchemaFactory.createForClass(Email);
