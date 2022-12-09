import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  instrument: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  location: string;

  @Prop()
  orchestraName: string;

  @Prop()
  website: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  creator_id: mongoose.Schema.Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);
