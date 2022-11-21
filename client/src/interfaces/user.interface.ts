import { Gender } from '@/enums/gender.enum';
import { Role } from '@enums/role.enum';

interface IUser {
  _id: string;
  active: boolean;
  address: Address;
  createdAt: Date;
  email: {
    address: string;
    isValidated: boolean;
  };
  gender: Gender;
  lastLogin: Date;
  name: string;
  password: string;
  phone: string;
  profileImage: string;
  role: Role;
  username: string;
  updatedAt: string;
  __v: number;
}
export type Address = {
  city: string;
  country: string;
};

export type GenericResponse = {
  status: string;
  message: string;
};

export type ILoginResponse = {
  status: string;
  message: string;
  access_token: string;
};

export type IUserResponse = {
  status: string;
  data: {
    user: IUser;
  };
};

export { type IUser };