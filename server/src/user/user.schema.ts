import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Instrument } from './instrument.interface';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  phoneNumber: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  picture: string;

  @Prop()
  description: string;

  @Prop()
  zipcode: string;

  @Prop()
  city: string;

  @Prop()
  instruments: Instrument[];

  // @Prop()
  // orchestraId: { type: Types.ObjectId; default: null };
  orchestraId: string;

  @Prop()
  posts: [];

  @Prop()
  // searching: { type: boolean; default: false };
  searching: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
