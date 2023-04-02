import { useEffect, useMemo, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L, { Marker } from 'leaflet';
import { Icon } from 'leaflet';
import { Offers } from '../../types/offer';
import { mapType, URL_PIN_CURRENT, URL_PIN_DEFAULT } from '../../const';
import useMap from '../../hooks/useMap';
import { useAppSelector } from '../../hooks';
import { getActiveOfferCard } from '../../store/app-process/selectors';

const defaultCustomPin = new Icon({
  iconUrl: URL_PIN_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomPin = new Icon({
  iconUrl: URL_PIN_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});


type MapProps = {
  offers: Offers;
  type: mapType;
}

function Map({offers, type}: MapProps): JSX.Element {
  const cityLocation = offers[0].city.location;
  const selectedPin = useAppSelector(getActiveOfferCard);

  const mapRef = useRef(null);
  const map = useMap(mapRef, cityLocation);

  const points = useMemo(() => {
    if (type === mapType.OnOfferScreen && selectedPin) {
      return offers.map((offer) => ({...offer.location, id: offer.id})).concat({id: selectedPin.id, ...selectedPin.location});
    } else {
      return offers.map((offer) => ({...offer.location, id: offer.id}));
    }
  }, [offers, type, selectedPin]);


  useEffect(() => {
    if (map) {
      const {latitude, longitude, zoom} = cityLocation;
      map.flyTo([latitude, longitude], zoom);
    }
  }, [map, cityLocation]);

  useEffect(() => {
    if (map) {
      const markerGroup = L.layerGroup().addTo(map);
      points.forEach((pin) => {
        const marker = new Marker({
          lat: pin.latitude,
          lng: pin.longitude,
        });

        marker
          .setIcon(
            selectedPin !== undefined && pin.id === selectedPin?.id
              ? currentCustomPin
              : defaultCustomPin
          ).addTo(markerGroup);
      });

      return () => {
        map.removeLayer(markerGroup);
      };
    }
  }, [map, points, selectedPin]);

  return (
    <div
      ref={mapRef}
      style={{ height: '100%' }}
    >
    </div>
  );
}

export default Map;
