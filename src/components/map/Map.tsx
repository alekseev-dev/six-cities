import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { City, Location, Offer, Offers } from '../../types/offer';
import { CitiesNames, URL_PIN_CURRENT, URL_PIN_DEFAULT } from '../../const';


const defaultCustomPin = L.icon({
  iconUrl: URL_PIN_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomPin = L.icon({
  iconUrl: URL_PIN_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});


type MapProps = {
  offers: Offers;
  selectedPin: Offer | undefined;
}

function Map({offers, selectedPin}: MapProps) {
  const {location} = offers[0];
  const {latitude,longitude, zoom} = location;


  return (
    <MapContainer center={[latitude, longitude]} zoom={zoom} scrollWheelZoom={false}
      style={{ height: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      {offers.map((locationForPin) => (
        <Marker
          key={locationForPin.id}
          position={[locationForPin.location.latitude, locationForPin.location.longitude]}
          icon={selectedPin !== undefined && locationForPin.id === selectedPin.id ? currentCustomPin : defaultCustomPin}
        >
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
