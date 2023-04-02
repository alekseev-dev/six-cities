export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum CitiesNames {
  Paris = 'Paris',
  Desseldorf = 'Dusseldorf',
  Brussels = 'Brussels',
  Colonge = 'Cologne',
  Hamburg = 'Hamburg',
  Amsterdam = 'Amsterdam',
}

export enum APIRoute {
  Hotels = '/hotels',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

export enum NameSpace {
  Data = 'data',
  User = 'user',
  App = 'app',
}

export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error',
}

export enum SortType {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRated = 'Top rated first',
}

export const Stars = ['1', '2', '3', '4', '5'];

export const RatingTitle = [
  'terribly',
  'badly',
  'not bad',
  'good',
  'perfect',
];

export enum mapType {
  OnMainScreen = 'onMainScreen',
  OnOfferScreen = 'onOfferScreen',
}

export const URL_PIN_DEFAULT = 'img/pin.svg';
export const URL_PIN_CURRENT = 'img/pin-active.svg';

