import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow, Polyline, Circle } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY, MAP_CONFIG } from '../../config';
import { Maximize2, Minimize2, X, Navigation2, Clock, Zap } from 'lucide-react';

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
  hoveredDevice = null, // Ahora es opcional
  onRouteInfoChange = null // Callback para pasar info de ruta al padre
}) => {
  const [map, setMap] = useState(null);
  const [route, setRoute] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null); // Información de la ruta (distancia, tiempo, etc)
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [initialMapCentered, setInitialMapCentered] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false); // Estado para pantalla completa

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ['geometry', 'places'], // Incluir geometry para decodificar polylines
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

  // Calcular ruta cuando se selecciona un dispositivo o cuando cambian ubicaciones
  // Se actualiza automáticamente en tiempo real conforme se mueven las ubicaciones
  // Calcula ambos modos: DRIVING (carro) y WALKING (a pie)
  useEffect(() => {
    if (selectedDevice && userLocation && map) {
      const directionsService = new window.google.maps.DirectionsService();
      
      // Función auxiliar para procesar la ruta
      const processRoute = (result, status, travelMode) => {
        if (status === 'OK') {
          const routes = result.routes;
          if (routes.length > 0) {
            const routeData = routes[0];
            // Decodificar el polyline path para obtener array de coordenadas
            const path = [];
            if (routeData.legs && routeData.legs.length > 0) {
              for (let i = 0; i < routeData.legs.length; i++) {
                const leg = routeData.legs[i];
                if (leg.steps && leg.steps.length > 0) {
                  for (let j = 0; j < leg.steps.length; j++) {
                    const step = leg.steps[j];
                    const points = window.google.maps.geometry.encoding.decodePath(step.polyline.points);
                    path.push(...points);
                  }
                }
              }
            }
            
            // Convertir LatLng objects a coordenadas simples
            const routePath = path.map(point => ({
              lat: point.lat(),
              lng: point.lng()
            }));
            
            // Solo actualizar el polyline con la ruta en carro (DRIVING)
            if (travelMode === 'DRIVING') {
              setRoute(routePath);
            }
            
            // Extraer información de la ruta
            if (routeData.legs && routeData.legs.length > 0) {
              const leg = routeData.legs[0];
              return {
                distance: leg.distance.text,
                distanceValue: leg.distance.value, // en metros
                duration: leg.duration.text,
                durationValue: leg.duration.value, // en segundos
              };
            }
          }
        }
        return null;
      };
      
      // Solicitar ruta en carro (DRIVING)
      directionsService.route(
        {
          origin: { lat: userLocation.latitude, lng: userLocation.longitude },
          destination: { lat: selectedDevice.latitude, lng: selectedDevice.longitude },
          travelMode: 'DRIVING',
        },
        (result, status) => {
          const drivingInfo = processRoute(result, status, 'DRIVING');
          
          // Solicitar ruta a pie (WALKING)
          directionsService.route(
            {
              origin: { lat: userLocation.latitude, lng: userLocation.longitude },
              destination: { lat: selectedDevice.latitude, lng: selectedDevice.longitude },
              travelMode: 'WALKING',
            },
            (walkResult, walkStatus) => {
              const walkingInfo = processRoute(walkResult, walkStatus, 'WALKING');
              
              if (drivingInfo || walkingInfo) {
                const routeInfo = {
                  driving: drivingInfo,
                  walking: walkingInfo,
                };
                setRouteInfo(routeInfo);
                
                // Notificar al componente padre
                if (onRouteInfoChange) {
                  onRouteInfoChange(routeInfo);
                }
              } else {
                setRoute(null);
                setRouteInfo(null);
                if (onRouteInfoChange) {
                  onRouteInfoChange(null);
                }
              }
            }
          );
        }
      );
    } else {
      setRoute(null);
      setRouteInfo(null);
      if (onRouteInfoChange) {
        onRouteInfoChange(null);
      }
    }
  }, [selectedDevice, userLocation, map, onRouteInfoChange]);

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
          title={`${device.name}${device.is_lost ? ' 🚨 PERDIDO' : ''}`}
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
              <p className="text-xs text-gray-500 mt-1">
                ±{Math.round(device.accuracy || 0)}m
              </p>
              {device.last_seen && (
                <p className="text-xs text-gray-500 mt-1">
                  🕐 {new Date(device.last_seen).toLocaleString('es-ES')}
                </p>
              )}
              {device.is_lost && (
                <div className="mt-2 px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold animate-pulse">
                  🚨 REPORTADO PERDIDO
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
    <div className="w-full h-full relative">
      {/* GoogleMap siempre a pantalla completa */}
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
        {/* Primera línea: Borde blanco más grueso para efecto de contorno */}
        {route && (
          <Polyline
            path={route}
            options={{
              strokeColor: '#ffffff',
              strokeOpacity: 0.4,
              strokeWeight: 6,
              geodesic: true,
            }}
          />
        )}
        
        {/* Segunda línea: Línea cyan principal con efecto dinámico */}
        {route && (
          <Polyline
            path={route}
            options={{
              strokeColor: '#01D9F6',
              strokeOpacity: 0.9,
              strokeWeight: 3,
              geodesic: true,
              icons: [
                {
                  icon: {
                    path: 'M 0,-1 0,1',
                    strokeOpacity: 1,
                    scale: 4,
                  },
                  offset: '0',
                  repeat: '20px',
                },
              ],
            }}
          />
        )}
      </GoogleMap>

      {/* Botón de pantalla completa - Esquina superior derecha */}
      <button
        onClick={() => setIsFullscreen(!isFullscreen)}
        className="absolute top-4 right-4 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg shadow-lg p-2 z-10 transition-all duration-200"
        title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
      >
        {isFullscreen ? (
          <Minimize2 className="w-5 h-5 text-gray-800 dark:text-gray-200" />
        ) : (
          <Maximize2 className="w-5 h-5 text-gray-800 dark:text-gray-200" />
        )}
      </button>

      {/* Mini-panel lateral en pantalla completa */}
      {isFullscreen && (
        <div className="absolute top-4 left-4 w-96 max-h-[90vh] bg-white dark:bg-gray-800 rounded-lg shadow-2xl z-10 flex flex-col overflow-hidden">
          {/* Header del mini-panel */}
          <div className="bg-gradient-to-r from-primary to-secondary p-4 flex items-center justify-between text-white">
            <h3 className="font-bold text-lg">Información de Ruta</h3>
            <button
              onClick={() => setIsFullscreen(false)}
              className="hover:bg-white hover:bg-opacity-20 rounded-lg p-1 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Contenido del mini-panel */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Información de ruta cuando hay dispositivo seleccionado */}
            {selectedDevice && routeInfo ? (
              <div className="space-y-3">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">
                    📍 Dispositivo Seleccionado
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedDevice.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {selectedDevice.latitude?.toFixed(4)}, {selectedDevice.longitude?.toFixed(4)}
                  </p>
                </div>

                {/* Información de ruta */}
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center space-x-2 mb-3">
                    <Navigation2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <h5 className="font-bold text-blue-900 dark:text-blue-200">Ruta Calculada</h5>
                  </div>
                  
                  <div className="space-y-2">
                    {/* Distancia */}
                    {routeInfo.driving && (
                      <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded p-2">
                        <div className="flex items-center space-x-1">
                          <Zap className="w-3 h-3 text-yellow-500" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">Distancia</span>
                        </div>
                        <span className="font-bold text-sm text-blue-600 dark:text-blue-400">
                          {routeInfo.driving.distance}
                        </span>
                      </div>
                    )}

                    {/* Tiempo en carro */}
                    {routeInfo.driving && (
                      <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded p-2">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-blue-500" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">En carro</span>
                        </div>
                        <span className="font-bold text-sm text-blue-600 dark:text-blue-400">
                          {routeInfo.driving.duration}
                        </span>
                      </div>
                    )}

                    {/* Tiempo a pie */}
                    {routeInfo.walking && (
                      <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded p-2">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-green-500" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">A pie</span>
                        </div>
                        <span className="font-bold text-sm text-green-600 dark:text-green-400">
                          {routeInfo.walking.duration}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <p className="text-sm">
                  Selecciona un dispositivo en el mapa para ver información de ruta
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;