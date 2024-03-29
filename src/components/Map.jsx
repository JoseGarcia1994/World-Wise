import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState, useEffect } from 'react';
import { useCities } from '../context/CitiesContext.jsx';
import useGeolocation from '../hooks/useGeolocation.js';
import useUrlPosition from '../hooks/useUrlPosition.js';
import ChangeCenter from './ChangeCenter.jsx';
import DetectClick from './DetectClick.jsx';
import Button from './Button.jsx';
import styles from './Map.module.css';

const Map = () => {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {isLoading: isLoadingPosition, position: geolocationPosition, getPosition} = useGeolocation();
  const [mapLat, mapLng] = useUrlPosition();

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng])
  }, [mapLat, mapLng])
  
  useEffect(() => {
    if(geolocationPosition) setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
  }, [geolocationPosition])
  
  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && <Button type="position" onClick={getPosition}>
        {isLoadingPosition ? 'Loading...' :  'Use your position'}
      </Button>}
      <MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map(city => (
          <Marker position={[city.position?.lat, city.position?.lng]} key={city.id}>
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition}/>
        <DetectClick />
      </MapContainer>
    </div>
  );
};

export default Map;