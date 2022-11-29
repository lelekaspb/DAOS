import { Prop } from '@nestjs/mongoose';

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @Prop()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Prop()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Prop()
  @IsNotEmpty()
  @IsString()
  password: string;

  @Prop()
  @IsEmail()
  email: string;

  constructor(
    firstName: string,
    lastName: string,
    password: string,
    email: string,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.email = email;
  }
}
