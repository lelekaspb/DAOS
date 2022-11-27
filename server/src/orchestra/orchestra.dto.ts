import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import * as mongoose from 'mongoose';

export class OrchestraDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  creator_id: string;

  @IsOptional()
  @IsArray()
  members: string[];

  @IsString()
  description: string;

  @IsString()
  website: string;

  @IsString()
  zipcode: string;

  @IsString()
  city: string;

  @IsString()
  musicians_amount: string;

  @IsString()
  practice_frequency: string;

  @IsArray()
  genres: [];

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
