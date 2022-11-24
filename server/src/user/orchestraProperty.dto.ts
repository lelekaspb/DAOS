import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class OrchestraPropertyDto {
  @IsNotEmpty()
  title: string;

  @IsString()
  id: string;

  constructor(title: string, id: string) {
    this.title = title;
    this.id = id;
  }
}
