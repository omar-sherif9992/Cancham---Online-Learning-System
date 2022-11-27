/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useQuery } from '@tanstack/react-query';

import styles from './cart-card.module.scss';

import CourseRating from '@pages/course/CourseRating';

import { Rating } from '@/interfaces/course.interface';

import { TraineeRoutes } from '@/services/axios/dataServices/TraineeDataService';

import { deleteRequest, postRequest } from '@/services/axios/http-verbs';

import { UseCartStoreRemoveCourse } from '@/store/cartStore';
import { POSTRoutesType } from '@/services/axios/types';

function remove(courseId: string) {
  const Courses = TraineeRoutes.DELETE.removeFromCart;

  Courses.URL = `/trainee/637969352c3f71696ca34759/cart/${courseId}`;

  return deleteRequest(Courses);
}

function move(courseId: string) {
  const Courses = TraineeRoutes.POST.addToWishlist;

  Courses.URL = `/trainee/637969352c3f71696ca34759/wishlist/${courseId}`;

  return postRequest(Courses as POSTRoutesType);
}

export default function CartCard(props: {
  passedFunction(): unknown;
  title: string;
  rating: number;
  category: string;
  subcategory: string;
  price: number;
  discount: [];
  currency: string;
  img: string;
  old: number;
  id: string;
  passedFunction2(): unknown;
}) {
  const rating: Rating = { averageRating: props.rating, reviews: [] };

  const removeFromCart = UseCartStoreRemoveCourse();

  const { refetch } = useQuery(['ASJLHFXYZZZY'], () => remove(props.id), {
    cacheTime: 1000 * 60 * 60 * 24,
    retryDelay: 1000, // 1 second
    enabled: false
  });

  const { refetch: moveToWishListRefetch } = useQuery(
    ['ASJLHFXYZZZYX'],
    () => move(props.id),
    {
      cacheTime: 1000 * 60 * 60 * 24,
      retryDelay: 1000, // 1 second
      enabled: false
    }
  );

  async function handleRemoveCart() {
    await refetch();

    removeFromCart(props.id);

    props.passedFunction();

    props.passedFunction2();
  }

  async function handleMoveToWishList() {
    await refetch();

    await moveToWishListRefetch();

    props.passedFunction();

    props.passedFunction2();
  }

  return (
    <div className={styles.container}>
      <div className={styles.img_container}>
        <img alt='course' className={styles.img_itself} src={props.img} />
      </div>
      <div className={styles.info}>
        <div className={styles.title}>{props.title}</div>
        <div className={styles.rating}>
          <CourseRating {...rating} />
        </div>
        <div className={styles.cat}>
          <span>{props.category}</span>{' '}
          <span style={{ fontSize: '2rem' }}>.</span>{' '}
          <span>{props.subcategory}</span>
        </div>
        <div className={styles.actions}>
          <span onClick={handleRemoveCart}>Remove</span>
          <span onClick={handleMoveToWishList}>Move to Whishlist</span>
        </div>
      </div>
      <div className={styles.pricing}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>
            {props.price} &nbsp;
            {props.currency}
          </div>
          {props.old != undefined && (
            <div
              style={{
                fontWeight: '500',
                color: '#7F8487',
                textDecoration: 'line-through',
                fontSize: '1.1rem'
              }}
            >
              {props.old} &nbsp;
              {props.currency}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}