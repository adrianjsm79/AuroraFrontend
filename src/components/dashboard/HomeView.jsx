import React from 'react';
import { Eye, EyeOff, Navigation, UserPlus, AlertCircle, MapPin, Smartphone, Users, Activity, Clock, Signal, Share2, Shield } from 'lucide-react';

const HomeView = ({ 
  user, 
  userLocation, 
  locationVisible, 
  locationError,
  trustedContacts,
  ws,
  toggleLocationVisibility,
  centerOnUserLocation,
  setCurrentView,
  setShowAddContact
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Hero */}
        <div className="bg-gradient-to-br from-primary via-secondary to-indigo-600 rounded-3xl shadow-2xl p-8 mb-8 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48"></div>
          <div className="relative z-10">
            <h1 className="text-5xl font-bold mb-2">
              ¡Hola, {user?.nombre}! 👋
            </h1>
            <p className="text-indigo-100 text-xl mb-6">
              Control total de tu ubicación y seguridad
            </p>
            <div className="flex items-center space-x-3 bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl px-4 py-2 w-fit">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold">Sistema en Tiempo Real Activo</span>
            </div>
          </div>
        </div>

        {locationError && (
          <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 px-6 py-4 rounded-xl mb-6 flex items-start shadow-md dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-700">
            <AlertCircle className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Advertencia de ubicación</p>
              <p className="text-sm mt-1">{locationError}</p>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Ubicación Principal */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl">
                  <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Tu Ubicación</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Información en tiempo real</p>
                </div>
              </div>
            </div>

            {userLocation ? (
              <>
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6 mb-4 border border-blue-100 dark:border-blue-900/50">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase mb-1">Latitud</p>
                      <p className="text-lg font-mono font-bold text-blue-600 dark:text-blue-400">
                        {userLocation.lat.toFixed(6)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase mb-1">Longitud</p>
                      <p className="text-lg font-mono font-bold text-blue-600 dark:text-blue-400">
                        {userLocation.lng.toFixed(6)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase mb-1">Precisión</p>
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">
                        ±{Math.round(userLocation.accuracy || 0)}m
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={centerOnUserLocation}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center space-x-2"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Ver en Mapa</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-8 text-center">
                <Signal className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                <p className="text-gray-600 dark:text-gray-400">Obteniendo tu ubicación...</p>
              </div>
            )}
          </div>

          {/* Estadísticas Rápidas */}
          <div className="space-y-6">
            {/* Conexión */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                  <Activity className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-bold text-gray-800 dark:text-gray-200">Estado</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">WebSocket</span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    ws?.current?.readyState === WebSocket.OPEN
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400'
                      : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400'
                  }`}>
                    {ws?.current?.readyState === WebSocket.OPEN ? '● Activo' : '● Offline'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Sincronización</span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-400">
                    ● Tiempo Real
                  </span>
                </div>
              </div>
            </div>

            {/* Contactos */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-pink-100 dark:bg-pink-900/30 p-2 rounded-lg">
                    <Users className="w-5 h-5 text-pink-600 dark:text-pink-400" />
                  </div>
                  <h3 className="font-bold text-gray-800 dark:text-gray-200">Contactos</h3>
                </div>
                <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                  {trustedContacts.length}
                </span>
              </div>
              <button
                onClick={() => setCurrentView('contacts')}
                className="w-full bg-pink-50 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300 py-2 rounded-lg font-semibold hover:bg-pink-100 dark:hover:bg-pink-900/30 transition text-sm"
              >
                {trustedContacts.length === 0 ? 'Agregar contacto' : 'Ver todos'}
              </button>
            </div>
          </div>
        </div>

        {/* Dispositivos y Acciones */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Dispositivos */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-xl">
                <Smartphone className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Tus Dispositivos</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Gestiona y monitorea tus dispositivos</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => setCurrentView('devices')}
                className="group bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-2 border-indigo-200 dark:border-indigo-900/50 rounded-xl p-6 hover:shadow-lg transition text-left"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Smartphone className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="font-bold text-gray-800 dark:text-gray-200">Mis Dispositivos</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Ver y configurar tus dispositivos</p>
              </button>

              <button
                onClick={() => setCurrentView('map')}
                className="group bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-2 border-blue-200 dark:border-blue-900/50 rounded-xl p-6 hover:shadow-lg transition text-left"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <h3 className="font-bold text-gray-800 dark:text-gray-200">Mapa en Vivo</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Ver ubicaciones en tiempo real</p>
              </button>
            </div>
          </div>

          {/* Acciones Rápidas */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-xl">
                <Shield className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Seguridad</h2>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setCurrentView('contacts');
                  setShowAddContact(true);
                }}
                className="w-full flex items-center space-x-3 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-300 py-3 px-4 rounded-xl font-semibold hover:shadow-md transition"
              >
                <UserPlus className="w-5 h-5" />
                <span className="text-sm">Agregar Contacto</span>
              </button>

              <button
                onClick={() => setCurrentView('about')}
                className="w-full flex items-center space-x-3 bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 text-orange-700 dark:text-orange-300 py-3 px-4 rounded-xl font-semibold hover:shadow-md transition"
              >
                <Share2 className="w-5 h-5" />
                <span className="text-sm">Descargar App</span>
              </button>

              <button
                onClick={toggleLocationVisibility}
                className="w-full flex items-center space-x-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 py-3 px-4 rounded-xl font-semibold hover:shadow-md transition"
              >
                {locationVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                <span className="text-sm">{locationVisible ? 'Ocultar' : 'Mostrar'} Ubicación</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;