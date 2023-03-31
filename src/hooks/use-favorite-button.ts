import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '.';
import { AppRoute, AuthorizationStatus } from '../const';
import { changeOfferStatusAction } from '../store/api-actions';
import { getAuthorizationStatus } from '../store/user-process/selectors';

export const useFavoriteButton = (id: number, isFavorite: boolean) => {
  const dispatch = useAppDispatch();
  const navitage = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const addToFavorite = () => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      navitage(AppRoute.Login);
      return;
    }
    dispatch(changeOfferStatusAction({id, isFavorite}));
  };

  return [addToFavorite];
};
