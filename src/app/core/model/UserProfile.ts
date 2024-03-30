export class UserProfile{
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  address: string;
  city: string;
  country: string;
  postalCode: number;
  aboutMe: string;

  constructor(firstname: string, lastname: string, email: string, username: string, address: string, city: string, country: string, postalCode: number, aboutMe: string) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.username = username;
    this.address = address;
    this.city = city;
    this.country = country;
    this.postalCode = postalCode;
    this.aboutMe = aboutMe;
  }
}
