import axios from 'axios';

import { PaginatedRequest, PaginatedResponse } from './utils';

export enum Level {
  ADVANCED = 'Advanced',
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate'
}

export type CourseFilters = {
  category?: string;
  country?: string;
  durationHigh?: number;
  durationLow?: number;
  level?: Level;
  priceHigh?: number;
  priceLow?: number;
  searchTerm?: string;
  sortBy: number; // 0 for Most Viewed, 1 for Most Rated, -1 don't sort
  subcategory?: string;
} & PaginatedRequest;

export type Price = {
  currency: string;
  currentValue: number;
  discounts: number[];
};
export type Review = {
  userID: string;
  comment: string;
  createdAt: Date;
  rating: number;
};
export type Rating = {
  averageRating: number;
  reviews: Review[];
};
export type User = {
  _id: string;
  name: string;
};
export type Instructor = {
  _user: User[];
};
export type Course = {
  _id: string;
  _instructor: Instructor;
  captions: string[];
  category: string;
  description: string;
  keywords: string[];
  language: string;
  level: Level;
  previewVideoURL: string;
  price: Price;
  subcategory: string[];
  thumbnail: string;
  title: string;
  numberOfEnrolledTrainees: number;
  duration: number;
  rating: Rating;
};

export async function getCourses(
  filter: CourseFilters
): Promise<PaginatedResponse<Course>> {
  const res = await axios.get<PaginatedResponse<Course>>(
    'http://localhost:3000/courses',
    {
      params: filter
    }
  );
  if (res.statusText !== 'OK') {
    throw new Error(`server returned response status ${res.statusText}`);
  }
  if (!res.data.success) {
    throw new Error(`server returned error ${res.data.message}`);
  }
  return res.data;
}

export function getTopRatedCourses(): Promise<PaginatedResponse<Course>> {
  return getCourses({
    page: 1,
    limit: 3,
    sortBy: 1
  });
}
