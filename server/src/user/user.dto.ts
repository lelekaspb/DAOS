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
import { InstrumentDto } from './instrument.dto';
import { Instrument } from './instrument.interface';
import { OrchestraPropertyDto } from './orchestraProperty.dto';

export class UserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  // @IsNotEmpty()
  @IsOptional()
  @IsString()
  password: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  picture: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  zipcode: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => InstrumentDto)
  instruments: InstrumentDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => OrchestraPropertyDto)
  orchestras_created: OrchestraPropertyDto[];

  @IsOptional()
  @IsBoolean()
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
