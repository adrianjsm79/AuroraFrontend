import React, { useState, useCallback, useEffect } from 'react';
import { Navigation, MapPin, Smartphone, Activity, Navigation2, Clock, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import MapView from '../map/MapView';

const MapPage = ({ userLocation, user, receivedContacts = [], devices = [], contactsDevices = [], fetchLocations }) => {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [lastUpdateTime, setLastUpdateTime] = useState(new Date());
  const [displayTime, setDisplayTime] = useState(new Date());
  const [routeInfo, setRouteInfo] = useState(null); // Información de la ruta desde MapView
  const [isPanelOpen, setIsPanelOpen] = useState(true); // Panel de dispositivos desplegable

  // Actualizar tiempo de última actualización cuando cambian los datos
  useEffect(() => {
    setLastUpdateTime(new Date());
  }, [devices, receivedContacts, userLocation]);

  // Actualizar el reloj de tiempo real cada segundo
  // Esto asegura que el timestamp siempre muestre la hora actual
  useEffect(() => {
    const displayTimer = setInterval(() => {
      setDisplayTime(new Date());
    }, 500); // Actualizar cada 500ms para máxima precisión

    return () => clearInterval(displayTimer);
  }, []);

  // Separar dispositivos del usuario por estado
  // Estos datos se actualizan en tiempo real a través de polling en Dashboard
  const userDevices = devices || [];
  const lostUserDevices = userDevices.filter(d => d.is_lost);
  const visibleUserDevices = userDevices.filter(d => !d.is_lost);

  // Dispositivos de los seguidores (usuarios que siguen al usuario actual - receivedContacts)
  // Extraer todos los dispositivos de los usuarios que siguen al usuario actual
  const followersDevices = receivedContacts.flatMap(follower => follower.devices || []);
  const lostFollowersDevices = followersDevices.filter(d => d.is_lost);
  const visibleFollowersDevices = followersDevices.filter(d => !d.is_lost);

  const DeviceCard = ({ device, type = 'user', isLost = false }) => {
    const cardClass = isLost ? 'bg-red-50 dark:bg-red-900/30 border-red-200 shadow-lg shadow-red-200/50 dark:shadow-red-900/30' : 'bg-gray-50 dark:bg-gray-700/50';
    const pinColor = 
      type === 'user' && isLost ? '#ef4444' :
      type === 'user' ? '#a855f7' :
      isLost ? '#fbbf24' :
      '#22c55e';

    // Formato mejorado para la fecha
    const formatLastSeen = (dateString) => {
      if (!dateString) return 'Sin datos';
      const date = new Date(dateString);
      const now = new Date();
      const diffSeconds = Math.floor((now - date) / 1000);
      
      if (diffSeconds < 60) {
        return 'Hace unos segundos';
      } else if (diffSeconds < 3600) {
        const minutes = Math.floor(diffSeconds / 60);
        return `Hace ${minutes} min`;
      } else if (diffSeconds < 86400) {
        const hours = Math.floor(diffSeconds / 3600);
        return `Hace ${hours} h`;
      } else {
        return date.toLocaleString('es-ES', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      }
    };

    return (
      <div
        className={`p-4 rounded-lg border-2 ${cardClass} dark:border-gray-600 cursor-pointer transition-all transform hover:scale-105 duration-200 ${
          selectedDevice?.id === device.id ? 'ring-2 ring-primary shadow-xl' : ''
        } ${isLost ? 'animate-pulse' : ''}`}
        onClick={() => setSelectedDevice(device)}
      >
        <div className="flex items-start space-x-3">
          <div
            className="w-3 h-3 rounded-full mt-1 flex-shrink-0 transition-all duration-200"
            style={{ backgroundColor: pinColor }}
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm truncate">
              {device.name}
              {isLost && <span className="ml-1">🚨</span>}
            </p>
            {type !== 'user' && (
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {device.user_email || 'Contacto'}
              </p>
            )}
            <div className="mt-2 space-y-1">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                📍 {device.latitude?.toFixed(4)}, {device.longitude?.toFixed(4)}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                ±{Math.round(device.accuracy || 0)}m
              </p>
              <p className={`text-xs font-medium transition-colors ${
                isLost 
                  ? 'text-red-600 dark:text-red-400' 
                  : 'text-green-600 dark:text-green-400'
              }`}>
                🕐 {formatLastSeen(device.last_seen)}
              </p>
            </div>
            {isLost && (
              <div className="mt-2 px-2 py-1 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded text-xs font-semibold animate-pulse">
                🚨 Reportado perdido
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center space-x-2">
                <MapPin className="w-6 h-6 text-primary" />
                <span>Mapa de Ubicaciones</span>
              </h2>
            </div>
            {/* Indicador de actualización en tiempo real */}
            <div className="flex items-center space-x-2 bg-green-100 dark:bg-green-900/30 px-3 py-2 rounded-lg">
              <div className="flex items-center space-x-1">
                <Activity className="w-4 h-4 text-green-600 dark:text-green-400 animate-pulse" />
                <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                  Tiempo Real
                </span>
              </div>
              <span className="text-xs text-green-600 dark:text-green-400 font-mono">
                {`${displayTime.toLocaleTimeString('es-ES')}`}
              </span>
            </div>
          </div>

          {/* Información de Ruta en el Header - Solo si hay dispositivo seleccionado */}
          {selectedDevice && routeInfo ? (
            <div className="flex items-center space-x-4 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="text-center">
                <p className="text-xs text-gray-600 dark:text-gray-400">Dispositivo</p>
                <p className="text-sm font-bold text-gray-800 dark:text-gray-200 truncate max-w-xs">
                  {selectedDevice.name}
                </p>
              </div>

              <div className="h-8 w-px bg-gray-300 dark:bg-gray-600" />

              {routeInfo.driving && (
                <>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Distancia</p>
                    <p className="text-sm font-bold text-yellow-600 dark:text-yellow-400">
                      {routeInfo.driving.distance}
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400">En Carro</p>
                    <p className="text-sm font-bold text-blue-600 dark:text-blue-400">
                      {routeInfo.driving.duration}
                    </p>
                  </div>
                </>
              )}

              {routeInfo.walking && (
                <div className="text-center">
                  <p className="text-xs text-gray-600 dark:text-gray-400">A Pie</p>
                  <p className="text-sm font-bold text-green-600 dark:text-green-400">
                    {routeInfo.walking.duration}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={fetchLocations}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition flex items-center space-x-2 font-semibold"
            >
              <Navigation className="w-5 h-5" />
              <span>Actualizar</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content - Mapa ocupa toda la pantalla */}
      <div className="flex-1 relative overflow-hidden">
        {/* Mapa */}
        <MapView
          userLocation={userLocation}
          user={user}
          devices={visibleUserDevices}
          lostDevices={lostUserDevices}
          contactsDevices={visibleFollowersDevices}
          lostContactsDevices={lostFollowersDevices}
          selectedDevice={selectedDevice}
          onRouteInfoChange={setRouteInfo}
        />

        {/* Panel Lateral Desplegable - Dispositivos */}
        <div
          className={`fixed left-0 top-20 bottom-0 w-80 bg-white dark:bg-gray-800 shadow-2xl z-30 transition-all duration-300 overflow-hidden flex flex-col ${
            isPanelOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Header del Panel */}
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 flex items-center justify-between">
            <h3 className="font-bold text-lg flex items-center space-x-2">
              <Smartphone className="w-5 h-5" />
              <span>Dispositivos</span>
            </h3>
          </div>

          {/* Contenido del Panel */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-4">
              {/* Dispositivos Propios Visibles */}
              {visibleUserDevices.length > 0 && (
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm mb-3 flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                    <span>Activos ({visibleUserDevices.length})</span>
                  </h3>
                  <div className="space-y-2">
                    {visibleUserDevices.map(device => (
                      <DeviceCard key={device.id} device={device} type="user" />
                    ))}
                  </div>
                </div>
              )}

              {/* Dispositivos Propios Perdidos */}
              {lostUserDevices.length > 0 && (
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm mb-3 flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span>Perdidos ({lostUserDevices.length})</span>
                  </h3>
                  <div className="space-y-2">
                    {lostUserDevices.map(device => (
                      <DeviceCard key={device.id} device={device} type="user" isLost />
                    ))}
                  </div>
                </div>
              )}

              {/* Dispositivos de Seguidores */}
              {visibleFollowersDevices.length > 0 && (
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm mb-3 flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span>Seguidores ({visibleFollowersDevices.length})</span>
                  </h3>
                  <div className="space-y-2">
                    {visibleFollowersDevices.map(device => (
                      <DeviceCard key={device.id} device={device} type="follower" />
                    ))}
                  </div>
                </div>
              )}

              {/* Dispositivos de Seguidores Perdidos */}
              {lostFollowersDevices.length > 0 && (
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm mb-3 flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <span>En Peligro ({lostFollowersDevices.length})</span>
                  </h3>
                  <div className="space-y-2">
                    {lostFollowersDevices.map(device => (
                      <DeviceCard key={device.id} device={device} type="follower" isLost />
                    ))}
                  </div>
                </div>
              )}

              {userDevices.length === 0 && followersDevices.length === 0 && (
                <div className="text-center py-8">
                  <Smartphone className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    No hay dispositivos
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Botón Toggle Panel */}
        <button
          onClick={() => setIsPanelOpen(!isPanelOpen)}
          className="fixed left-0 top-24 z-40 bg-primary hover:bg-secondary text-white p-2 rounded-r-lg shadow-lg transition-all"
          title={isPanelOpen ? 'Cerrar panel' : 'Abrir panel'}
        >
          {isPanelOpen ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>

        {/* Leyenda - Esquina inferior derecha (sobre el mapa de Google) */}
        <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-80 backdrop-blur rounded-lg shadow-lg p-4 z-20 max-w-xs">
          <div className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-sm">
            Leyenda
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-blue-500" />
              <span className="text-gray-700 dark:text-gray-300">Tu ubicación</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="text-gray-700 dark:text-gray-300">Tus dispositivos</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-gray-700 dark:text-gray-300">Seguidores</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-gray-700 dark:text-gray-300">Perdidos</span>
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <span className="text-gray-700 dark:text-gray-300">En peligro</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
