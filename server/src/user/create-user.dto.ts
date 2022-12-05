import { Prop } from '@nestjs/mongoose';

import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @Prop()
  @IsNotEmpty({ message: 'Fornavn må ikke være tomt' })
  @IsString({ message: 'Fornavn skal være en streng' })
  firstName: string;

  @Prop()
  @IsNotEmpty({ message: 'Efternavn må ikke være tomt' })
  @IsString({ message: 'Efternavn skal være en streng' })
  lastName: string;

  @Prop()
  @Length(3, 10, {
    message: 'Adgangskoden skal indeholde mindst 3 og maks. 10 tegn',
  })
  @IsString({ message: 'Adgangskoden skal være en streng' })
  password: string;

  @Prop()
  @IsEmail({}, { message: 'E-mail skal være en gyldig e-mailadresse' })
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
