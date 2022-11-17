import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { InstrumentDto } from './instrument.dto';
import { Instrument } from './instrument.interface';

export class UserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  password: string;

  @IsEmail()
  email: string;

  @IsOptional()
  phoneNumber: string;

  @IsOptional()
  picture: string;

  @IsOptional()
  description: string;

  @IsOptional()
  zipcode: string;

  @IsOptional()
  city: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => InstrumentDto)
  instruments: InstrumentDto[];

  @IsOptional()
  searching: boolean;

  constructor(
    firstName: string,
    lastName: string,
    password: string,
    email: string,
    // phoneNumber: string,
    // picture: string,
    // description: string,
    // zipcode: string,
    // city: string,
    // instruments: [],
    // searching: boolean,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.email = email;
    // this.phoneNumber = phoneNumber;
    // this.picture = picture;
    // this.description = description;
    // this.zipcode = zipcode;
    // this.city = city;
    // this.instruments = instruments;
    // this.searching = searching;
  }
}
