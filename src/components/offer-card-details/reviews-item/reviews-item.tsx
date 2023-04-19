import { Comment } from '../../../types/comment-data';
import { converRatingToStarsToRound, getComentData } from '../../../utils/utils';


type ReviewItemProps = {
  review: Comment;
}

function ReviewItem({review}: ReviewItemProps): JSX.Element {
  const {user, rating, date, comment} = review;
  const {name, avatarUrl} = user;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">
          {name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: converRatingToStarsToRound(rating)}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={date}>{getComentData(date)}</time>
      </div>
    </li>
  );
}

export default ReviewItem;
