import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getOfferCard, getOffersNearby } from '../../store/data-process/selectors';
import OfferCardDetails from '../../components/offer-card-details/offer-card-details';
import OfferCard from '../../components/offer-card/offer-card';
import { fetchOfferCardAction, } from '../../store/api-actions';
import { useEffect } from 'react';
import LoadingScreen from '../loading-screen/loading-screen';
import { dataProcessActions } from '../../store/data-process/data-process';
import Map from '../../components/map/Map';
import { mapType } from '../../const';

function OfferScreen(): JSX.Element {
  const {id} = useParams();
  const offerId = Number(id);
  const dispatch = useAppDispatch();

  const offer = useAppSelector(getOfferCard);
  const offersNearby = useAppSelector(getOffersNearby);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatch(fetchOfferCardAction(offerId));
    }
    return () => {
      isMounted = false;
      dispatch(dataProcessActions.cleanUpOfferCardInStore());
    };
  }, [dispatch, offerId]);

  if (!offer) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <div className="page">
      <Helmet>
        <title>6 Cities. Offer</title>
      </Helmet>
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <OfferCardDetails
            offer={offer}
          />
        </section>
        <section className="property__map map">
          <Map
            offers={offersNearby}
            type={mapType.OnOfferScreen}
          />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {offersNearby.map((item) => (
                <OfferCard
                  key={item.id}
                  offer={item}
                  typeOfMap={mapType.OnOfferScreen}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default OfferScreen;
