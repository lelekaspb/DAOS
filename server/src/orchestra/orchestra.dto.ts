import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import * as mongoose from 'mongoose';

export class OrchestraDto {
  @IsNotEmpty({ message: 'Ensemblets navn må ikke være tomt' })
  title: string;

  @IsNotEmpty({ message: 'Creator id cannot be empty' })
  creator_id: string;

  @IsOptional()
  @IsArray({ message: 'Members property must be of array type' })
  members: string[];

  @IsNotEmpty({ message: 'Ensemblebeskrivelsen må ikke være tom' })
  @IsString()
  description: string;

  @IsNotEmpty({ message: 'Hjemmesiden må ikke være tom' })
  @IsString()
  website: string;

  @IsNotEmpty({ message: 'Postnummer må ikke være tomt' })
  @IsString()
  zipcode: string;

  @IsNotEmpty({ message: 'By må ikke være tomt' })
  @IsString()
  city: string;

  @IsNotEmpty({ message: 'Antal aktive musikere må ikke være tomme' })
  @IsString()
  musicians_amount: string;

  @IsNotEmpty({ message: 'Øvelsesfrekvens må ikke være tom' })
  @IsString()
  practice_frequency: string;

  @IsNotEmpty({ message: 'Genrer må ikke være tomme' })
  @IsArray()
  @ArrayMinSize(1, { message: 'Genrer må ikke være tomme' })
  @IsString({ each: true })
  genres: string[];

  constructor(
    title: string,
    creator_id: string,
    description: string,
    website: string,
    zipcode: string,
    city: string,
    musicians_amount: string,
    practice_frequency: string,
    genres: [],
  ) {
    this.title = title;
    this.creator_id = creator_id;
    this.description = description;
    this.website = website;
    this.zipcode = zipcode;
    this.city = city;
    this.musicians_amount = musicians_amount;
    this.practice_frequency = practice_frequency;
    this.genres = genres;
  }
}
