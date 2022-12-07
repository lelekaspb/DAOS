import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class InstrumentDto {
  @IsNotEmpty({ message: 'Instrumentet må ikke være tomt' })
  title: string;

  @IsNotEmpty({ message: 'Genrer må ikke være tomme' })
  @IsArray()
  @ArrayMinSize(1, { message: 'Genrer må ikke være tomme' })
  @IsString({ each: true })
  genres: string[];

  constructor(title: string, genres: string[]) {
    this.title = title;
    this.genres = genres;
  }
}
