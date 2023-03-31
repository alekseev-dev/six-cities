export const converRatingToStars = (rating: number): number => rating * 20;

const monthOfYeah = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const getComentData = (dataFromServer: string): string => {
  const date = new Date(dataFromServer);
  const getMonth = date.getMonth();
  const getYeah = date.getFullYear();
  return `${monthOfYeah[getMonth]} ${getYeah}`;
};

export const checkForEmptyArray = <T>(array: T[]):boolean => array.length > 0;
