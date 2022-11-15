import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
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
  instruments: [];

  // @Prop()
  // orchestraId: { type: Types.ObjectId; default: null };
  orchestraId: string;

  @Prop()
  posts: [];

  @Prop()
  // searching: { type: boolean; default: false };
  searching: boolean;

  timestamps: true;
}

export const UserSchema = SchemaFactory.createForClass(User);
