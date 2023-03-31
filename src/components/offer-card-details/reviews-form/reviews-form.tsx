import { FormEvent, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RatingTitle, Stars, Status } from '../../../const';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { submitReviewAction } from '../../../store/api-actions';
import { getSubmitReviewStatus } from '../../../store/data-process/selectors';
import Star from '../../stars/star';


function ReviewsForm(): JSX.Element {
  const MIN_COMMENT_LENGTH = 50;
  const MAX_COMMENT_LENGTH = 300;

  const reversedRatingTitle: readonly string[] = RatingTitle.slice().reverse();
  const reversedStars: readonly string[] = Stars.slice().reverse();

  const status = useAppSelector(getSubmitReviewStatus);
  const isLoading = status === Status.Loading;
  const isError = status === Status.Error;
  const isSubmitted = status === Status.Success;

  const dispatch = useAppDispatch();

  const {id} = useParams<string>();
  const idToNumber = Number(id);

  const commentRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [rating, setRating] = useState<number | null>(null);
  const [isCommentValidated, setIsCommentValidated] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (commentRef.current && rating && id) {
      dispatch(submitReviewAction({
        id: idToNumber,
        comment: commentRef.current.value,
        rating,
      }));
    }
  };

  const checkCommentLength = () => {
    if (commentRef.current) {
      const commentLength = [...commentRef.current.value].length;

      setIsCommentValidated(
        commentLength > MIN_COMMENT_LENGTH &&
        commentLength < MAX_COMMENT_LENGTH
      );
    }
  };

  if (isSubmitted && formRef.current) {
    formRef.current.reset();
  }

  const formVavidation = () => rating && id && isCommentValidated;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="reviews__form form"
      action="#"
      method="post"
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {
          reversedStars
            .map((value, index) => (
              <Star
                key={value}
                value={value}
                setRating={setRating}
                title={reversedRatingTitle[index]}
              />
            ))
        }
      </div>
      <textarea
        onInput={checkCommentLength}
        ref={commentRef}
        className={`reviews__textarea form__textarea ${isError ? 'shake' : ''}`}
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
      >
      </textarea>
      <div className="reviews__button-wrapper">
        {isError ? (
          <p className="reviews__error">
            Somethink went wrong. Plase try again...
          </p>
        ) : (
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
        )}
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!formVavidation() || isLoading}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewsForm;
