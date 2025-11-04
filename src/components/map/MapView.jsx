import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow, Circle } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY, MAP_CONFIG } from '../../config';

const MapView = ({ locations, userLocation, onMapLoad }) => {
  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
    if (onMapLoad) onMapLoad(mapInstance);
  }, [onMapLoad]);

  useEffect(() => {
    if (map && userLocation) {
      map.panTo({ lat: userLocation.lat, lng: userLocation.lng });
    }
  }, [userLocation, map]);

  const markerColors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];

  if (loadError) {
    return <div>Error al cargar el mapa. Revisa la API Key de Google Maps.</div>;
  }

  if (!isLoaded) {
    return <div>Cargando mapa...</div>;
  }

  return (
    <div className="map-container" style={{ height: '100%', width: '100%' }}>
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        center={userLocation || MAP_CONFIG.defaultCenter}
        zoom={MAP_CONFIG.defaultZoom}
        options={MAP_CONFIG.options}
        onLoad={onLoad}
      >
        {locations.map((location, index) => {
          const isCurrentUser = location.isCurrentUser;
          const position = { lat: location.latitude, lng: location.longitude };
          
          return (
            <React.Fragment key={location.user_id}>
              <Marker
                position={position}
                onClick={() => setSelectedMarker(location)}
                icon={{
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: isCurrentUser ? 12 : 10,
                  fillColor: isCurrentUser ? '#6366f1' : markerColors[index % markerColors.length],
                  fillOpacity: 1,
                  strokeColor: '#ffffff',
                  strokeWeight: isCurrentUser ? 3 : 2,
                }}
                animation={isCurrentUser ? window.google.maps.Animation.BOUNCE : null}
              />
              
              {location.accuracy && (
                <Circle
                  center={position}
                  radius={location.accuracy}
                  options={{
                    fillColor: isCurrentUser ? '#6366f1' : markerColors[index % markerColors.length],
                    fillOpacity: 0.1,
                    strokeColor: isCurrentUser ? '#6366f1' : markerColors[index % markerColors.length],
                    strokeOpacity: 0.3,
                    strokeWeight: 1,
                  }}
                />
              )}
            </React.Fragment>
          );
        })}

        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.latitude, lng: selectedMarker.longitude }}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <div className="p-2">
              <h3 className="font-bold text-indigo-600 mb-1">
                {selectedMarker.nombre}
                {selectedMarker.isCurrentUser && ' (Tú)'}
              </h3>
              <p className="text-xs text-gray-600">
                {new Date(selectedMarker.timestamp).toLocaleString('es-ES', {
                  hour: '2-digit',
                  minute: '2-digit',
                  day: '2-digit',
                  month: 'short'
                })}
              </p>
              {selectedMarker.accuracy && (
                <p className="text-xs text-gray-500 mt-1">
                  Precisión: ±{Math.round(selectedMarker.accuracy)}m
                </p>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default MapView;