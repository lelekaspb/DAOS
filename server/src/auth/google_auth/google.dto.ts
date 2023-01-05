import { Prop } from '@nestjs/mongoose';


export class GoogleDto {
  @Prop()
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  image: string;


  constructor(
    email: string,
    firstName: string,
    image: string,
  ) {
    this.email = email;
    this.firstName = firstName;
    this.image = image;
  }
}