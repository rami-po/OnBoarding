/**
 * Created by Rami Khadder on 7/26/2017.
 */
export class EmergencyForm {
  id: number;
  firstName: string;
  lastName: string;
  middleInitial: string;
  streetAddress: string;
  apartmentUnit: string;
  city: string;
  state: string;
  zipCode: string;
  primaryPhone: string;
  altPhone: string;
  relationship: string;

  constructor(id:number, firstName: string, lastName: string, middleInitial: string,
              streetAddress: string, apartmentUnit: string, city: string,
              state: string, zipCode: string, primaryPhone: string, altPhone: string,
              relationship: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleInitial = middleInitial;
    this.streetAddress = streetAddress;
    this.apartmentUnit = apartmentUnit;
    this.city = city;
    this.state = state;
    this.zipCode = zipCode;
    this.primaryPhone = primaryPhone;
    this.altPhone = altPhone;
    this.relationship = relationship;
  }
}
