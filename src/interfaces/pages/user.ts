export interface UserValue {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  passwordConfirmation: string;
  address: Address
}

export interface LoginValue {
  email: string;
  password: string;
}

export interface Address {
  zipcode: number;
  state: string;
  city: string;
  street: string;
  number: number;
}
