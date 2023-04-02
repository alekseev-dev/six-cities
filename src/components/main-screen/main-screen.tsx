import { useAppSelector } from '../../hooks';
import MainScreenFull from '../../pages/main-screen-full/main-screen-full';
import { getOfferList } from '../../store/data-process/selectors';
import MainScreenEmpty from '../main-empty/main-empty';


function MainScreen(): JSX.Element {
  const offers = useAppSelector(getOfferList);


  return offers.length !== 0
    ? <MainScreenFull />
    : <MainScreenEmpty />;
}

export default MainScreen;
