import React, { useState, useCallback } from 'react';
import { Navigation, MapPin, Smartphone } from 'lucide-react';
import MapView from '../map/MapView';

const MapPage = ({ userLocation, user, receivedContacts = [], devices = [], contactsDevices = [], fetchLocations }) => {
  const [selectedDevice, setSelectedDevice] = useState(null);
  // Removido: hoveredDevice - el hover se manejará internamente en MapView

  // Separar dispositivos del usuario por estado
  const userDevices = devices || [];
  const lostUserDevices = userDevices.filter(d => d.is_lost);
  const visibleUserDevices = userDevices.filter(d => !d.is_lost);

  // Dispositivos de los seguidores (contactos que dieron confianza)
  const followersDevices = contactsDevices || [];
  const lostFollowersDevices = followersDevices.filter(d => d.is_lost);
  const visibleFollowersDevices = followersDevices.filter(d => !d.is_lost);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const DeviceCard = ({ device, type = 'user', isLost = false }) => {
    const cardClass = isLost ? 'bg-red-50 dark:bg-red-900/30 border-red-200' : 'bg-gray-50 dark:bg-gray-700/50';
    const pinColor = 
      type === 'user' && isLost ? '#ef4444' :
      type === 'user' ? '#a855f7' :
      isLost ? '#fbbf24' :
      '#22c55e';

    return (
      <div
        className={`p-4 rounded-lg border-2 ${cardClass} dark:border-gray-600 cursor-pointer transition transform hover:scale-105 ${
          selectedDevice?.id === device.id ? 'ring-2 ring-primary' : ''
        }`}
        onClick={() => setSelectedDevice(device)}
      >
        <div className="flex items-start space-x-3">
          <div
            className="w-3 h-3 rounded-full mt-1 flex-shrink-0"
            style={{ backgroundColor: pinColor }}
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm truncate">
              {device.name}
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
                🕐 {formatDate(device.last_seen)}
              </p>
            </div>
            {isLost && (
              <div className="mt-2 px-2 py-1 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded text-xs font-semibold">
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
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center space-x-2">
              <MapPin className="w-6 h-6 text-primary" />
              <span>Mapa de Ubicaciones</span>
            </h2>
          </div>
          <button
            onClick={fetchLocations}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition flex items-center space-x-2 font-semibold"
          >
            <Navigation className="w-5 h-5" />
            <span>Actualizar</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Mapa */}
        <div className="flex-1 relative">
          <MapView
            userLocation={userLocation}
            user={user}
            devices={visibleUserDevices}
            lostDevices={lostUserDevices}
            contactsDevices={visibleFollowersDevices}
            lostContactsDevices={lostFollowersDevices}
            selectedDevice={selectedDevice}
          />
        </div>

        {/* Paneles Laterales */}
        <div className="w-80 flex flex-col bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button className="flex-1 px-4 py-3 bg-primary text-white font-semibold text-sm flex items-center justify-center space-x-2">
              <Smartphone className="w-4 h-4" />
              <span>Mis Dispositivos</span>
            </button>
            <button className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 font-semibold text-sm flex items-center justify-center space-x-2 hover:bg-gray-200 dark:hover:bg-gray-600 transition">
              <Smartphone className="w-4 h-4" />
              <span>Seguidores</span>
            </button>
          </div>

          {/* Lista de Dispositivos */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 space-y-4">
              {/* Dispositivos Propios Visibles */}
              {visibleUserDevices.length > 0 && (
                <div>
                  <h3 className="font-bold text-gray-800 dark:text-gray-200 text-sm mb-3 flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500" />
                    <span>Dispositivos Activos ({visibleUserDevices.length})</span>
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
                    <span>Dispositivos Perdidos ({lostUserDevices.length})</span>
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
                    <span>Seguidores Activos ({visibleFollowersDevices.length})</span>
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
                    <span>Seguidores en Peligro ({lostFollowersDevices.length})</span>
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
                    No hay dispositivos para mostrar
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Leyenda Compacta */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-700/50 text-xs space-y-2">
            <div className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Leyenda de Colores</div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span>Tu ubicación (navegador)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span>Tus dispositivos</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span>Dispositivos de seguidores</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <span>Tus dispositivos perdidos</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span>Seguidores en peligro</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
