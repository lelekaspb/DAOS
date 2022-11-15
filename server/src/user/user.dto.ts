import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  password: string;

  // phoneNumber: string;

  @IsEmail()
  email: string;

  // picture: string;

  // description: string;

  // zipcode: string;

  // city: string;

  // instruments: [];

  // searching: boolean;

  constructor(
    firstName: string,
    lastName: string,
    password: string,
    // phoneNumber: string,
    email: string,
    // picture: string,
    // description: string,
    // zipcode: string,
    // city: string,
    // instruments: [],
    // searching: boolean,
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    // this.phoneNumber = phoneNumber;
    this.email = email;
    // this.picture = picture;
    // this.description = description;
    // this.zipcode = zipcode;
    // this.city = city;
    // this.instruments = instruments;
    // this.searching = searching;
  }
}
