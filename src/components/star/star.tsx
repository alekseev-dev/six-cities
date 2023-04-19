
type StarProps = {
  value: string;
  title: string;
  setRating: (e: number) => void;
}

function Star({value, title, setRating}: StarProps): JSX.Element {
  const getRatingToNumber = (ratingValue: string): number => Number(ratingValue);

  return (
    <>
      <input
        onChange={(e) => setRating(getRatingToNumber(e.target.value))}
        className="form__rating-input visually-hidden"
        name="rating" value={value}
        id={`${value}-stars`}
        type="radio"
        data-testid="star"
      />
      <label
        htmlFor={`${value}-stars`}
        className="reviews__rating-label form__rating-label"
        title={title}
      >
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export default Star;
