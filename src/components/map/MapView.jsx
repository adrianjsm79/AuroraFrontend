import React, { useState, useEffect, useCallback } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow, Circle } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY, MAP_CONFIG } from '../../config';

const MapView = ({ locations, userLocation, devices = [], contactsDevices = [], onMapLoad }) => {
  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [visibleDevices, setVisibleDevices] = useState(new Set());

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

  // Por defecto todos los contactos devices son visibles
  useEffect(() => {
    const deviceIds = new Set(contactsDevices.map(d => d.id));
    setVisibleDevices(deviceIds);
  }, [contactsDevices]);

  const toggleDeviceVisibility = (deviceId) => {
    setVisibleDevices(prev => {
      const newSet = new Set(prev);
      if (newSet.has(deviceId)) {
        newSet.delete(deviceId);
      } else {
        newSet.add(deviceId);
      }
      return newSet;
    });
  };

  const markerColors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'];

  if (loadError) {
    return <div>Error al cargar el mapa. Revisa la API Key de Google Maps.</div>;
  }

  if (!isLoaded) {
    return <div>Cargando mapa...</div>;
  }

  return (
    <div className="relative w-full h-full">
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
            const isBrowserDevice = location.isBrowserDevice;
            const position = { lat: location.latitude, lng: location.longitude };
            
            // Color azul para navegador, indigo para otros del usuario, colores variados para contactos
            let markerColor;
            if (isBrowserDevice) {
              markerColor = '#3b82f6'; // azul
            } else if (isCurrentUser) {
              markerColor = '#6366f1'; // indigo
            } else {
              markerColor = markerColors[index % markerColors.length];
            }
            
            return (
              <React.Fragment key={location.user_id}>
                <Marker
                  position={position}
                  onClick={() => setSelectedMarker(location)}
                  icon={{
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: isCurrentUser ? 12 : 10,
                    fillColor: markerColor,
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
                      fillColor: markerColor,
                      fillOpacity: 0.1,
                      strokeColor: markerColor,
                      strokeOpacity: 0.3,
                      strokeWeight: 1,
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}

          {/* Marcadores de dispositivos de contactos */}
          {contactsDevices.map((device, index) => {
            if (!visibleDevices.has(device.id) || !device.latitude || !device.longitude) {
              return null;
            }
            
            const position = { lat: device.latitude, lng: device.longitude };
            const deviceColor = '#9333ea'; // púrpura para dispositivos
            
            return (
              <React.Fragment key={`device-${device.id}`}>
                <Marker
                  position={position}
                  onClick={() => setSelectedMarker({ ...device, isDevice: true })}
                  icon={{
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: 8,
                    fillColor: deviceColor,
                    fillOpacity: 0.8,
                    strokeColor: '#ffffff',
                    strokeWeight: 2,
                  }}
                />
                
                {device.accuracy && (
                  <Circle
                    center={position}
                    radius={device.accuracy}
                    options={{
                      fillColor: deviceColor,
                      fillOpacity: 0.05,
                      strokeColor: deviceColor,
                      strokeOpacity: 0.2,
                      strokeWeight: 1,
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}

          {/* Marcadores de dispositivos propios */}
          {devices.map((device, index) => {
            if (!device.latitude || !device.longitude) {
              return null;
            }
            
            const position = { lat: device.latitude, lng: device.longitude };
            const deviceColor = '#06b6d4'; // cyan para dispositivos propios
            
            return (
              <React.Fragment key={`own-device-${device.id}`}>
                <Marker
                  position={position}
                  onClick={() => setSelectedMarker({ ...device, isOwnDevice: true })}
                  icon={{
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: 8,
                    fillColor: deviceColor,
                    fillOpacity: 0.8,
                    strokeColor: '#ffffff',
                    strokeWeight: 2,
                  }}
                />
                
                {device.accuracy && (
                  <Circle
                    center={position}
                    radius={device.accuracy}
                    options={{
                      fillColor: deviceColor,
                      fillOpacity: 0.05,
                      strokeColor: deviceColor,
                      strokeOpacity: 0.2,
                      strokeWeight: 1,
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}

          {selectedMarker && (
            <InfoWindow
              position={{ 
                lat: selectedMarker.latitude, 
                lng: selectedMarker.longitude 
              }}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div className="p-3 max-w-xs bg-white rounded-lg shadow-md">
                <h3 className="font-bold text-indigo-600 mb-2">
                  {selectedMarker.nombre}
                  {selectedMarker.isBrowserDevice && ' 🌐'}
                  {selectedMarker.isCurrentUser && ' (Tú)'}
                </h3>
                
                {selectedMarker.deviceName && (
                  <p className="text-xs text-gray-700 mb-1">
                    <strong>Dispositivo:</strong> {selectedMarker.deviceName}
                  </p>
                )}
                
                {selectedMarker.email && (
                  <p className="text-xs text-gray-600 mb-1">
                    <strong>Email:</strong> {selectedMarker.email}
                  </p>
                )}
                
                {selectedMarker.numero && (
                  <p className="text-xs text-gray-600 mb-1">
                    <strong>Teléfono:</strong> {selectedMarker.numero}
                  </p>
                )}
                
                <p className="text-xs text-gray-600 mb-2">
                  <strong>Última actualización:</strong> {new Date(selectedMarker.timestamp).toLocaleString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit',
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
                
                <div className="pt-2 border-t border-gray-200 space-y-1">
                  {selectedMarker.accuracy && (
                    <p className="text-xs text-gray-500">
                      <strong>Precisión:</strong> ±{Math.round(selectedMarker.accuracy)}m
                    </p>
                  )}
                  {selectedMarker.isVisible !== undefined && (
                    <p className="text-xs text-gray-500">
                      <strong>Visible para contactos:</strong> {selectedMarker.isVisible ? '✓ Sí' : '✗ No'}
                    </p>
                  )}
                  {selectedMarker.isLost && (
                    <p className="text-xs text-red-600 font-semibold">
                      ⚠️ Reportado como perdido
                    </p>
                  )}
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>

      {/* Panel de control de dispositivos */}
      {contactsDevices.length > 0 && (
        <div className="absolute bottom-6 left-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 max-w-xs max-h-48 overflow-y-auto z-10">
          <h4 className="font-bold text-sm text-gray-800 dark:text-gray-200 mb-3">Dispositivos de Contactos</h4>
          <div className="space-y-2">
            {contactsDevices.map((device) => (
              <div key={device.id} className="flex items-center space-x-2">
                <button
                  onClick={() => toggleDeviceVisibility(device.id)}
                  className={`flex-shrink-0 w-4 h-4 rounded border-2 transition-colors ${
                    visibleDevices.has(device.id)
                      ? 'bg-purple-500 border-purple-600'
                      : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                  }`}
                />
                <div className="text-xs flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 dark:text-gray-200 truncate">{device.name}</p>
                  <p className="text-gray-600 dark:text-gray-400 truncate">{device.user?.nombre || 'Desconocido'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Leyenda actualizada */}
      <div className="absolute top-6 right-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 z-10">
        <p className="font-bold text-sm text-gray-800 dark:text-gray-200 mb-3">Leyenda</p>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <span className="text-xs text-gray-700 dark:text-gray-300">Tu navegador 🌐</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-indigo-600 rounded-full"></div>
            <span className="text-xs text-gray-700 dark:text-gray-300">Tu ubicación/dispositivo</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-indigo-500 rounded-full opacity-50"></div>
            <span className="text-xs text-gray-700 dark:text-gray-300">Ubicación de contacto</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-xs text-gray-700 dark:text-gray-300">Dispositivo de contacto</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
            <span className="text-xs text-gray-700 dark:text-gray-300">Tu dispositivo móvil</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;