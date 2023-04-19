import { NavLink } from 'react-router-dom';
import { CitiesNames } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { appProcessActions } from '../../store/app-process/app-process';
import { dataProcessActions } from '../../store/data-process/data-process';
import { SortType } from '../../const';
import { getCurrentCity } from '../../store/app-process/selectors';

type LocationItemProps = {
  city: CitiesNames;
}

function LocationItem({city}: LocationItemProps) {
  const dispatch = useAppDispatch();
  const currentCity = useAppSelector(getCurrentCity);

  return (
    <li className="locations__item">
      <NavLink
        className={`locations__item-link tabs__item ${city === currentCity ? 'tabs__item--active' : ''}`}
        to='/'
        onClick={() => {
          dispatch(appProcessActions.chooseCity(city));
          dispatch(dataProcessActions.setSortType(SortType.Popular));
        }}
        data-testid='pagination-city'
      >
        <span>{city}</span>
      </NavLink>
    </li>
  );
}

export default LocationItem;

