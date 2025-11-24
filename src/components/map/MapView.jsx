import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow, Polyline, Circle } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY, MAP_CONFIG } from '../../config';

// Función para crear un icono SVG con un ícono de persona dentro
const createUserLocationIcon = () => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
      <circle cx="12" cy="12" r="10" fill="#3b82f6" stroke="white" stroke-width="2.5"/>
      <circle cx="12" cy="8" r="2.5" fill="white"/>
      <path d="M 12 10.5 Q 9 13.5 9 15.5 Q 9 17.5 12 17.5 Q 15 17.5 15 15.5 Q 15 13.5 12 10.5" fill="white"/>
      <!-- Sombra exterior para mejor contraste -->
      <circle cx="12" cy="12" r="11" fill="none" stroke="rgba(0,0,0,0.3)" stroke-width="1"/>
    </svg>
  `;
  
  return {
    url: `data:image/svg+xml;base64,${btoa(svg)}`,
    scaledSize: new window.google.maps.Size(44, 44),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(22, 22),
  };
};

// Función para crear un icono SVG con un ícono de dispositivo móvil dentro
const createDeviceIcon = (color, isSelected = false, isHovered = false) => {
  const baseSize = 32;
  const scale = isSelected || isHovered ? 1.35 : 1;
  const size = baseSize * scale;
  
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
      <circle cx="12" cy="12" r="11" fill="${color}" stroke="white" stroke-width="2.5"/>
      <rect x="8.5" y="6.5" width="7" height="11" rx="0.8" fill="white" stroke="white" stroke-width="0.5"/>
      <circle cx="12" cy="15.5" r="0.8" fill="${color}"/>
      <!-- Sombra exterior para mejor contraste -->
      <circle cx="12" cy="12" r="12" fill="none" stroke="rgba(0,0,0,0.3)" stroke-width="1"/>
    </svg>
  `;
  
  return {
    url: `data:image/svg+xml;base64,${btoa(svg)}`,
    scaledSize: new window.google.maps.Size(size, size),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(size / 2, size / 2),
  };
};

const MapView = ({ 
  userLocation, 
  user,
  devices = [], 
  lostDevices = [],
  contactsDevices = [], 
  lostContactsDevices = [],
  selectedDevice,
  hoveredDevice = null // Ahora es opcional
}) => {
  const [map, setMap] = useState(null);
  const [route, setRoute] = useState(null);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [initialMapCentered, setInitialMapCentered] = useState(false);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  // Centrar mapa en la ubicación del usuario solo cuando carga inicialmente
  useEffect(() => {
    if (map && userLocation && !initialMapCentered) {
      map.panTo({ lat: userLocation.latitude, lng: userLocation.longitude });
      setInitialMapCentered(true);
    }
  }, [map, initialMapCentered]); // No incluir userLocation para evitar re-centering

  // Actualizar marcador de ubicación del usuario en tiempo real sin re-centrar
  // Este efecto solo actualiza visualmente la posición sin mover la cámara
  // excepto si el dispositivo seleccionado es del usuario

  // Calcular ruta cuando se selecciona un dispositivo
  useEffect(() => {
    if (selectedDevice && userLocation && map) {
      const directionsService = new window.google.maps.DirectionsService();
      
      directionsService.route(
        {
          origin: { lat: userLocation.latitude, lng: userLocation.longitude },
          destination: { lat: selectedDevice.latitude, lng: selectedDevice.longitude },
          travelMode: 'DRIVING',
        },
        (result, status) => {
          if (status === 'OK') {
            setRoute(result.routes[0].overview_polyline);
          }
        }
      );
    } else {
      setRoute(null);
    }
  }, [selectedDevice, userLocation, map]);

  // Cuando se selecciona un dispositivo, hacer zoom a él sin mover innecesariamente
  useEffect(() => {
    if (selectedDevice && map && userLocation) {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend({ lat: userLocation.latitude, lng: userLocation.longitude });
      bounds.extend({ lat: selectedDevice.latitude, lng: selectedDevice.longitude });
      map.fitBounds(bounds, { padding: 100 });
    }
  }, [selectedDevice, map, userLocation]);

  // Componente para renderizar un dispositivo como marcador - Memoizado para evitar re-renders innecesarios
  const DeviceMarker = useCallback(({ device, color, type }) => {
    const position = { lat: device.latitude, lng: device.longitude };
    const isHovered = hoveredDevice === device.id;
    const isSelected = selectedDevice?.id === device.id;

    return (
      <React.Fragment key={device.id}>
        <Marker
          position={position}
          onClick={() => {/* Selección manejada por el panel */}}
          onMouseOver={() => setHoveredMarker(device.id)}
          onMouseOut={() => setHoveredMarker(null)}
          icon={createDeviceIcon(color, isSelected, isHovered)}
          animation={null}
        />
        
        {/* Círculo de precisión */}
        <Circle
          center={position}
          radius={device.accuracy || 0}
          options={{
            strokeColor: color,
            strokeOpacity: 0.5,
            strokeWeight: 1,
            fillColor: color,
            fillOpacity: 0.2,
          }}
        />

        {/* Info Window al pasar el cursor - Desactivado el auto-pan */}
        {hoveredMarker === device.id && (
          <InfoWindow 
            position={position} 
            options={{ 
              pixelOffset: new window.google.maps.Size(0, -35),
              disableAutoPan: true, // 🔑 Clave: Previene el movimiento automático del mapa
              maxWidth: 280
            }}
          >
            <div className="bg-white p-3 rounded-lg shadow-lg text-gray-800 text-sm">
              <p className="font-semibold">{device.name}</p>
              {device.user_email && <p className="text-xs text-gray-600 mt-1">{device.user_email}</p>}
              <p className="text-xs text-gray-500 mt-2">
                📍 {device.latitude?.toFixed(4)}, {device.longitude?.toFixed(4)}
              </p>
              {device.last_seen && (
                <p className="text-xs text-gray-500 mt-1">
                  🕐 {new Date(device.last_seen).toLocaleString()}
                </p>
              )}
              {device.is_lost && (
                <div className="mt-2 px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">
                  🚨 Reportado perdido
                </div>
              )}
            </div>
          </InfoWindow>
        )}
      </React.Fragment>
    );
  }, [hoveredDevice, selectedDevice, hoveredMarker]);

  // Pre-renderizar los marcadores de cada categoría para optimizar performance
  // Utilizamos useMemo para evitar re-renders innecesarios cuando los datos cambian
  const userMarkers = useMemo(() => 
    devices.map(device => <DeviceMarker key={device.id} device={device} color="#a855f7" type="user" />),
    [devices, DeviceMarker]
  );

  const lostUserMarkers = useMemo(() => 
    lostDevices.map(device => <DeviceMarker key={device.id} device={device} color="#ef4444" type="user-lost" />),
    [lostDevices, DeviceMarker]
  );

  // Marcadores de dispositivos de seguidores - se actualizan en tiempo real
  const contactsMarkers = useMemo(() => 
    contactsDevices.map(device => <DeviceMarker key={device.id} device={device} color="#22c55e" type="follower" />),
    [contactsDevices, DeviceMarker]
  );

  const lostContactsMarkers = useMemo(() => 
    lostContactsDevices.map(device => <DeviceMarker key={device.id} device={device} color="#fbbf24" type="follower-lost" />),
    [lostContactsDevices, DeviceMarker]
  );

  if (loadError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
        <div>Error al cargar el mapa. Revisa la API Key de Google Maps.</div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
        <div>Cargando mapa...</div>
      </div>
    );
  }

  const markerPosition = { 
    lat: userLocation?.latitude || MAP_CONFIG.defaultCenter.lat, 
    lng: userLocation?.longitude || MAP_CONFIG.defaultCenter.lng 
  };

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '100%' }}
      zoom={MAP_CONFIG.defaultZoom}
      options={MAP_CONFIG.options}
      onLoad={onLoad}
    >
      {/* Pin azul: Ubicación del navegador del usuario */}
      {userLocation && (
        <Marker
          position={{
            lat: userLocation.latitude,
            lng: userLocation.longitude
          }}
          icon={createUserLocationIcon()}
          animation={window.google.maps.Animation.BOUNCE}
          title="Tu ubicación (Navegador)"
        />
      )}

      {/* Pins verdes: Dispositivos de seguidores (contactos que dieron confianza) */}
      {contactsMarkers}

      {/* Pins morados: Dispositivos del usuario */}
      {userMarkers}

      {/* Pin rojo: Dispositivos perdidos del usuario */}
      {lostUserMarkers}

      {/* Pin amarillo: Dispositivos perdidos de seguidores */}
      {lostContactsMarkers}

      {/* Ruta desde el pin azul al dispositivo seleccionado */}
      {route && (
        <Polyline
          path={route}
          options={{
            strokeColor: '#01D9F6',
            strokeOpacity: 0.8,
            strokeWeight: 3,
            geodesic: true,
          }}
        />
      )}
    </GoogleMap>
  );
};

export default MapView;