import { Rating } from '@/common/Types/common.types';
import { Types } from 'mongoose';

export interface Instructor {
  _corporate?: Types.ObjectId[];
  _id: Types.ObjectId;
  _teachedCourses: Types.ObjectId[];
  balance: number;
  bankAccount: BankAccount;
  biography: string;
  rating: Rating;
  socialMedia: SocialMedia;
  speciality: string;
  title: string;
}

type BankAccount = {
  accountHolderName: string;
  accountNumber: string;
  bankName: string;
  branchAddress: string;
  branchName: string;
  swiftCode: string;
};

type SocialMedia = {
  facebook: string;
  github: string;
  linkedin: string;
  personalWebsite: string;
  twitter: string;
};
