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
  description: string;

    //   @IsNotEmpty()
    //   orchestra_name: string;

    //   @IsNotEmpty()
    //   creator_id: string;

  // Members: [];

  // description: string;

  // website: string;

  // zip_code: number;

  // city: string;

  // musicians_amount: string;

  // practice_frequency: number;

  // genres: [];

}

export const OrchestraSchema = SchemaFactory.createForClass(Orchestra);