import { isEmail, IsNotEmpty } from 'class-validator';

export class OrchestraDto {
  @IsNotEmpty()
  orchestra_name: string;

  @IsNotEmpty()
  creator_id: string;

  // Members: [];
  description: string;
  website: string;
  zip_code: number;
  city: string;
  // musicians_amount: string;
  practice_frequency: number;
  //genres: [];

  constructor(
    orchestra_name: string,
    creator_id: string,
    // Members: [],
    description: string,
    website: string,
    zip_code: number,
    city: string,
    // musicians_amount: string,
    practice_frequency: number,
    //genres: [],
  ) {
    this.orchestra_name = orchestra_name;
    this.creator_id = creator_id;
    this.description = description;
    this.website = website;
    this.zip_code = zip_code;
    this.city = city;
    this.practice_frequency = practice_frequency;
  }
}
