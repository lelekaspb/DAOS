import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString, isString } from 'class-validator';
import { Document } from 'mongoose';

export type OrchestraDocument = Orchestra & Document;

@Schema()
export class Orchestra {

  @Prop({required: true})
  @IsString()
  orchestra_name: string;

  @Prop({ required: true })
  @IsString()
  creator_id: string;

  // @Prop()
  // Members: [];
 
  @Prop()
  description: string;

  @Prop()
  website: string;
  
  @Prop()
  zip_code: string;

  @Prop()
  city: string;

  @Prop()
  musicians_amount: string;
  
  @Prop()
  practice_frequency: string;

  // @Prop()
  // genres: [];

}

export const OrchestraSchema = SchemaFactory.createForClass(Orchestra);