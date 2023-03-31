import { useEffect, useMemo, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import {Icon, Marker} from 'leaflet';
import { Offer, Offers } from '../../types/offer';
import { URL_PIN_CURRENT, URL_PIN_DEFAULT } from '../../const';
import useMap from '../../hooks/useMap';


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
  selectedPin: Offer | undefined;
}


function Map({offers, selectedPin}: MapProps) {
  const cityLocation = offers[0].city.location;

  const mapRef = useRef(null);
  const map = useMap(mapRef, cityLocation);

  useEffect(() => {
    if (map) {
      const {latitude, longitude, zoom} = cityLocation;
      map.flyTo([latitude, longitude], zoom);
    }
  }, [map, cityLocation]);

  useEffect(() => {
    if (map) {
      const markerGroup = L.layerGroup().addTo(map);

      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker
          .setIcon(
            selectedPin !== undefined && offer.id === selectedPin.id
              ? currentCustomPin
              : defaultCustomPin
          ).addTo(markerGroup);
      });

      return () => {
        map.removeLayer(markerGroup);
      };
    }
  }, [map, offers, selectedPin]);

  return (
    <div
      ref={mapRef}
      style={{ height: '100%' }}
    >
    </div>
  );
}

export default Map;
