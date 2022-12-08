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
import { InstrumentDto } from './instrument.dto';

export class UserDto {
  @Prop()
  @IsNotEmpty({ message: 'First name must not be empty' })
  @IsString({ message: 'First name field must be a string' })
  firstName: string;

  @Prop()
  @IsNotEmpty({ message: 'Last name must not be empty' })
  @IsString({ message: 'Last name field must be a string' })
  lastName: string;

  @Prop()
  @IsOptional()
  @IsString()
  password: string;

  @Prop()
  @IsEmail({}, { message: 'Email must be a valid email address' })
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

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  @IsOptional()
  orchestras_created: any[];

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
  }
}
