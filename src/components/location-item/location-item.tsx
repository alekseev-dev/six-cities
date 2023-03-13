import { NavLink } from 'react-router-dom';
import { CitiesNames } from '../../const';
import { useAppDispatch } from '../../hooks';
import { chooseCity } from '../../store/app-process/app-process';

type LocationItemProps = {
  city: CitiesNames;
}

function LocationItem({ city }: LocationItemProps) {
  const dispatch = useAppDispatch();

  return (
    <li className="locations__item">
      <NavLink
        className="locations__item-link tabs__item" to='/'
        onClick={() => dispatch(chooseCity(city))}
      >
        <span>{city}</span>
      </NavLink>
    </li>
  );
}

export default LocationItem;

// className={({ isActive }) =>`locations__item-link tabs__item ${isActive ? 'tabs__item--active' : ''}`} to="#"
