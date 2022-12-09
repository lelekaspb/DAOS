import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString, isString } from 'class-validator';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type OrchestraDocument = Orchestra & Document;

@Schema()
export class Orchestra {
  @Prop({ required: true })
  @IsString()
  title: string;

  @Prop({ required: true })
  @IsString()
  creator_id: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  members: any[];

  @Prop()
  description: string;

  @Prop()
  website: string;

  @Prop()
  zipcode: string;

  @Prop()
  city: string;

  @Prop()
  musicians_amount: string;

  @Prop()
  practice_frequency: string;

  @Prop()
  genres: string[];
}

export const OrchestraSchema = SchemaFactory.createForClass(Orchestra);
