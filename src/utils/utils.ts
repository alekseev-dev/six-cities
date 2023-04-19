
export const converRatingToStars = (rating: number): number => rating * 20;

export const converRatingToStarsToRound = (rating: number): number => Math.round(rating) * 20;

export const getComentData = (dataFromServer: string): string => {
  const date = new Date(dataFromServer);
  const formatedDate = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric'
  }).format(date);
  return formatedDate;
};

export const checkForEmptyArray = <T>(array: T[]):boolean => array.length > 0;

export const reversedRatingTitle = (ratingTitle: readonly string[]) => ratingTitle.slice().reverse();

export const reversedStars = (stars: readonly string[]) => stars.slice().reverse();
