import { Prop } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';
import { PostDto } from 'src/post/post.dto';
import { InstrumentDto } from './instrument.dto';

export class UserDto {
  @Prop()
  @IsNotEmpty({ message: 'Fornavn må ikke være tomt' })
  @IsString({ message: 'Fornavn skal være en streng' })
  firstName: string;

  @Prop()
  @IsNotEmpty({ message: 'Efternavn må ikke være tomt' })
  @IsString({ message: 'Efternavn skal være en streng' })
  lastName: string;

  @Prop()
  @IsOptional()
  @IsString()
  password: string;

  @Prop()
  @IsEmail({}, { message: 'E-mail skal være en gyldig e-mailadresse' })
  email: string;

  @Prop()
  @IsOptional()
  @IsString()
  phoneNumber: string;

  @Prop()
  @IsOptional()
  @IsString()
  picture: string;

  @Prop()
  @IsOptional()
  @IsString()
  description: string;

  @Prop()
  @IsOptional()
  @IsString()
  zipcode: string;

  @Prop()
  @IsOptional()
  @IsString()
  city: string;

  @Prop()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => InstrumentDto)
  instruments: InstrumentDto[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Orchestra' }] })
  @IsOptional()
  orchestras_created: any[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }] })
  @IsOptional()
  posts: mongoose.Schema.Types.ObjectId[];

  @Prop()
  @IsOptional()
  @IsBoolean()
  searching: boolean;

  constructor(
    firstName: string,
    lastName: string,
    password: string,
    email: string,
    phoneNumber: string,
    picture: string,
    description: string,
    zipcode: string,
    city: string,
    instruments: [],
    searching: boolean,
    posts: [],
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.picture = picture;
    this.description = description;
    this.zipcode = zipcode;
    this.city = city;
    this.instruments = instruments;
    this.searching = searching;
    this.posts = posts;
  }
}
