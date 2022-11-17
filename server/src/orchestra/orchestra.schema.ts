import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrchestraDocument = Orchestra & Document;

@Schema()
export class Orchestra {

  @Prop({required: true})
  orchestra_name: string;

  @Prop({ required: true })
  creator_id: string;

  @Prop()
  Members: [];
 
  @Prop()
  description: string;

  @Prop()
  website: string;
  
  @Prop()
  zip_code: number;

  @Prop()
  city: string;

  @Prop()
  musicians_amount: string;
  
  @Prop()
  practice_frequency: number;

  @Prop()
  genres: [];

}

export const OrchestraSchema = SchemaFactory.createForClass(Orchestra);