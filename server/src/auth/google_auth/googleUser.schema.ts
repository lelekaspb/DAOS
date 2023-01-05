import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GoogleUserDocument = HydratedDocument<GoogleUser>;

@Schema()
export class GoogleUser {
  @Prop()
  firstName: string;

  @Prop()
  email: string;

  @Prop()
  image: string;
}

export const GoogleUserSchema = SchemaFactory.createForClass(GoogleUser);