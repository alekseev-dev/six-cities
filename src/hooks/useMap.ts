import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Map, TileLayer} from 'leaflet';
import { Location } from '../types/offer';

type useMapType = (mapRef: MutableRefObject<HTMLElement | null>, cityLocation: Location) => Map | null

const useMap: useMapType = (mapRef, cityLocation) => {
  const [map, setMap] = useState<Map | null>(null);

  const isMounted = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isMounted.current) {
      const mapInstance = new Map(mapRef.current, {
        center: {
          lat: cityLocation.latitude,
          lng: cityLocation.longitude
        },
        zoom: cityLocation.zoom
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      );

      mapInstance.addLayer(layer);

      setMap(mapInstance);
      isMounted.current = true;
    }
  }, [mapRef, map, cityLocation]);

  return map;
};

export default useMap;
