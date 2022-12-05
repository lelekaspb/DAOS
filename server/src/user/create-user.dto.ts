import { Prop } from '@nestjs/mongoose';

import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @Prop()
  @IsNotEmpty({ message: 'First name must not be empty' })
  @IsString({ message: 'First name field must be a string' })
  firstName: string;

  @Prop()
  @IsNotEmpty({ message: 'Last name must not be empty' })
  @IsString({ message: 'Last name field must be a string' })
  lastName: string;

  @Prop()
  @Length(3, 10, {
    message: 'Password must containt at least 3 and max 10 characters',
  })
  @IsString({ message: 'Password must be a string' })
  password: string;

  @Prop()
  @IsEmail({}, { message: 'Email must be a valid email address' })
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
