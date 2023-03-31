import { useFavoriteButton } from '../../hooks/use-favorite-button';

type overrides = {
  width: string;
  height: string;
  name: string;
}

export const favoriteButtonSmall = {
  name: 'place-card',
  width: '18',
  height: '19',
};

export const favoriteButtonBig = {
  name: 'property',
  width: '31',
  height: '33',
};

type FavoriteButtonProps = {
  id: number;
  isFavorite: boolean;
  overrides: overrides;
}

function FavoriteButton({id, isFavorite, overrides}: FavoriteButtonProps): JSX.Element {
  const [addToFavorite] = useFavoriteButton(id, isFavorite);

  const {width, height, name} = overrides;
  return (
    <button className={`${name}__bookmark-button button ${isFavorite ? `${name}__bookmark-button--active` : ''}`}
      onClick={addToFavorite}
      type="button"
    >
      <svg
        className={`${name}__bookmark-icon`}
        width={width}
        height={height}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default FavoriteButton;
