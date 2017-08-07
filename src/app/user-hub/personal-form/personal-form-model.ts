/**
 * Created by Rami Khadder on 7/26/2017.
 */
export class PersonalForm {
  id: number;
  firstName: string;
  lastName: string;
  middleInitial: string;
  streetAddress: string;
  apartmentUnit: string;
  city: string;
  state: string;
  zipCode: string;
  homePhone: string;
  altPhone: string;
  birthday: string;
  spouseName: string;
  spouseEmployer: string;
  spouseWorkPhone: string;
  computer: string;

  constructor(id: number, firstName: string, lastName: string, middleInitial: string,
              streetAddress: string, apartmentUnit: string, city: string, state: string,
              zipCode: string, homePhone: string, altPhone: string, birthday:string,
              spouseName: string, spouseEmployer: string, spouseWorkPhone: string,
              computer: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleInitial = middleInitial;
    this.streetAddress = streetAddress;
    this.apartmentUnit = apartmentUnit;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
    this.homePhone = homePhone;
    this.altPhone = altPhone;
    this.birthday = birthday;
    this.spouseName = spouseName;
    this.spouseEmployer = spouseEmployer;
    this.spouseWorkPhone = spouseWorkPhone;
    this.computer = computer;
  }
}
