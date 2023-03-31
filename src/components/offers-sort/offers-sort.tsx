import { SortType } from '../../const';
import { useState, useEffect } from 'react';
import SelectItem from '../select-item/select-item';
import { useAppSelector } from '../../hooks';
import { getCurrentSortType } from '../../store/data-process/selectors';
import { getCurrentCity } from '../../store/app-process/selectors';


function OffersSort(): JSX.Element {
  const [openedSelect, setOpenSelect] = useState(false);
  const sortType = useAppSelector(getCurrentSortType);
  const currentCity = useAppSelector(getCurrentCity);
  const [currentSortType, setCurrentSortType] = useState(sortType);

  useEffect(() => {
    setCurrentSortType(sortType);
  }, [sortType, currentCity]);


  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        onClick={() => setOpenSelect(!openedSelect)}
        className="places__sorting-type"
        tabIndex={0}
      >
        {currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${openedSelect ? 'places__options--opened' : ''}`}
      >
        {Object.values(SortType).map((type) => (
          <SelectItem
            key={type}
            type={type}
            currentSortType={setCurrentSortType}
            setOpenSelect={setOpenSelect}
          />
        ))}
      </ul>
    </form>
  );
}

export default OffersSort;
