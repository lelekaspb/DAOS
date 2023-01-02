import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Instrument } from './instrument.interface';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
 // @Prop({ required: true })
 @Prop()
  firstName: string;

 // @Prop({ required: true })
 @Prop()
  lastName: string;

  //@Prop({ required: true })
  @Prop()
  password: string;

  @Prop()
  phoneNumber: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  image: string;

  @Prop()
  description: string;

  @Prop()
  zipcode: string;

  @Prop()
  city: string;

  @Prop()
  instruments: Instrument[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Orchestra' }] })
  orchestras_created: any[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  posts: mongoose.Schema.Types.ObjectId[];

  @Prop()
  searching: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
