import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class InstrumentDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  genres: string[];

  constructor(title: string, genres: string[]) {
    this.title = title;
    this.genres = genres;
  }
}
