import { system, image, name, address, datatype, commerce, random, internet, date, lorem } from 'faker';
import { CitiesNames } from '../const';
import { Comment, Comments } from '../types/comment-data';
import { ActiveOffer, Offer, Offers } from '../types/offer';
import { UserData } from '../types/user-data';


export const makeFakeOffer = ({...data} = {}): Offer => ({
  bedrooms: datatype.number({min: 1, max: 10}),
  city: {
    location: {
      latitude: Number(address.latitude()),
      longitude: Number(address.longitude()),
      zoom: datatype.number({min: 5, max: 20}),
    },
    name: CitiesNames.Paris
  },
  description: commerce.productDescription(),
  goods: new Array(13).fill(null).map(() => (random.word())),
  host: {
    avatarUrl: image.avatar(),
    id: datatype.number({min: 1, max: 100}),
    isPro: datatype.boolean(),
    name: name.firstName(),
  },
  id: datatype.number({min: 1, max: 100}),
  images: new Array(13).fill(null).map(() => (image.imageUrl())),
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: {
    latitude: Number(address.latitude()),
    longitude: Number(address.longitude()),
    zoom: datatype.number(),
  },
  maxAdults: datatype.number(),
  previewImage: system.filePath(),
  price: datatype.number({min: 1, max: 10000}),
  rating: datatype.number({min: 1, max: 5, precision: 0.1}),
  title: name.title(),
  type: name.title(),
  ...data,
});

export const makeFakeSelectedPin = ({...data} = {}): ActiveOffer => ({
  location: {
    latitude: Number(address.latitude()),
    longitude: Number(address.longitude()),
    zoom: datatype.number(),
  },
  id: datatype.number({min: 1, max: 100}),
  ...data,
});

export const makeFakeOffers = (): Offers => new Array(2).fill(null).map(() => (
  makeFakeOffer()
));

export const makeFakeUserData = ({...data} = {}): UserData => ({
  avatarUrl: image.avatar(),
  email: internet.email(),
  id: datatype.number({min: 1, max: 100}),
  isPro: datatype.boolean(),
  name: name.firstName(),
  token: datatype.string(40),
  ...data,
});

export const makeFakeComment = ({...data} = {}): Comment => ({
  comment: lorem.lines(3),
  date: date.past().toString(),
  id: datatype.number({min: 1, max: 100}),
  rating: datatype.number({min: 1, max: 5}),
  user: {
    id: datatype.number({min: 1, max: 100}),
    isPro: datatype.boolean(),
    name: name.firstName(),
    avatarUrl: image.avatar(),
  },
  ...data,
});

export const makeFakeComments = (): Comments => new Array(2).fill(null).map(() => (
  makeFakeComment()
));
