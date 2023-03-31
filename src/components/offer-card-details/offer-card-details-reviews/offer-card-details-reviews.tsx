import { AuthorizationStatus } from '../../../const';
import { useAppSelector } from '../../../hooks';
import { getOfferCardReviews } from '../../../store/data-process/selectors';
import { getAuthorizationStatus } from '../../../store/user-process/selectors';
import ReviewsForm from '../reviews-form/reviews-form';
import ReviewItem from '../reviews-item/reviews-item';


function OfferCardDetailsReviews(): JSX.Element {
  const reviews = useAppSelector(getOfferCardReviews);
  const isAuth = useAppSelector(getAuthorizationStatus) === AuthorizationStatus.Auth;

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews
          .slice(0, 10)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .map((review) => (
            <ReviewItem
              key={review.id}
              review={review}
            />
          ))}
      </ul>
      {isAuth &&
        <ReviewsForm />}
    </section>
  );
}

export default OfferCardDetailsReviews;
