import React from 'react';
import { Eye, EyeOff, Navigation, UserPlus, AlertCircle } from 'lucide-react';

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
    <div className="max-w-6xl mx-auto">
      <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl shadow-2xl p-8 mb-8 text-white">
        <h2 className="text-4xl font-bold mb-2">
          ¡Hola, {user?.nombre}!
        </h2>
        <p className="text-indigo-100 text-lg">
          Gestiona tu ubicación y contactos de confianza
        </p>
      </div>

      {locationError && (
        <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 px-6 py-4 rounded-xl mb-6 flex items-start shadow-md">
          <AlertCircle className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Advertencia de ubicación</p>
            <p className="text-sm mt-1">{locationError}</p>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card de Ubicación */}
        <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Tu Ubicación</h3>
            <button
              onClick={toggleLocationVisibility}
              className={`p-3 rounded-xl transition-all transform hover:scale-110 ${
                locationVisible
                  ? 'bg-green-100 text-green-600'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {locationVisible ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-gray-600 mb-4">
            {locationVisible
              ? 'Tu ubicación se comparte con tus contactos'
              : 'Tu ubicación está oculta'}
          </p>
          {userLocation && (
            <div className="bg-indigo-50 rounded-xl p-3 text-sm">
              <p className="text-indigo-900 font-mono">
                <strong>Lat:</strong> {userLocation.lat.toFixed(6)}
              </p>
              <p className="text-indigo-900 font-mono">
                <strong>Lng:</strong> {userLocation.lng.toFixed(6)}
              </p>
              {userLocation.accuracy && (
                <p className="text-indigo-600 text-xs mt-2">
                  Precisión: ±{Math.round(userLocation.accuracy)}m
                </p>
              )}
            </div>
          )}
          {userLocation && (
            <button
              onClick={centerOnUserLocation}
              className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-xl font-semibold hover:bg-indigo-700 transition flex items-center justify-center space-x-2"
            >
              <Navigation className="w-4 h-4" />
              <span>Ver en Mapa</span>
            </button>
          )}
        </div>

        {/* Card de Contactos */}
        <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Contactos</h3>
            <div className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
              <span className="font-bold">{trustedContacts.length}</span>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            {trustedContacts.length === 0
              ? 'No tienes contactos aún'
              : `${trustedContacts.length} contacto${trustedContacts.length !== 1 ? 's' : ''} de confianza`}
          </p>
          <div className="space-y-2 mb-4">
            {trustedContacts.slice(0, 3).map((contact) => (
              <div key={contact.id} className="flex items-center space-x-2 bg-gray-50 rounded-lg p-2">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {contact.nombre.charAt(0)}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700 truncate">{contact.nombre}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setCurrentView('contacts')}
            className="w-full bg-gradient-to-r from-primary to-secondary text-white py-2 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition"
          >
            {trustedContacts.length === 0 ? 'Agregar Contactos' : 'Ver Todos'}
          </button>
        </div>

        {/* Card de Estadísticas */}
        <div className="bg-white rounded-2xl shadow-xl p-6 transform hover:scale-105 transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800">Actividad</h3>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="text-gray-600">Estado</span>
              <span className="font-bold text-green-600">Activo</span>
            </div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <span className="text-gray-600">Conexión</span>
              <span className="font-bold text-indigo-600">
                {ws?.current?.readyState === WebSocket.OPEN ? 'Conectado' : 'Desconectado'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Precisión GPS</span>
              <span className="font-bold text-purple-600">
                {userLocation?.accuracy ? `±${Math.round(userLocation.accuracy)}m` : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Acciones Rápidas</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <button
            onClick={() => setCurrentView('map')}
            className="flex items-center justify-center space-x-3 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-600 py-4 rounded-xl font-semibold transition transform hover:scale-105"
          >
            <Navigation className="w-5 h-5" />
            <span>Abrir Mapa</span>
          </button>
          <button
            onClick={() => {
              setCurrentView('contacts');
              setShowAddContact(true);
            }}
            className="flex items-center justify-center space-x-3 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 text-purple-600 py-4 rounded-xl font-semibold transition transform hover:scale-105"
          >
            <UserPlus className="w-5 h-5" />
            <span>Agregar Contacto</span>
          </button>
          <button
            onClick={toggleLocationVisibility}
            className="flex items-center justify-center space-x-3 bg-gradient-to-r from-pink-50 to-orange-50 hover:from-pink-100 hover:to-orange-100 text-pink-600 py-4 rounded-xl font-semibold transition transform hover:scale-105"
          >
            {locationVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            <span>{locationVisible ? 'Ocultar Ubicación' : 'Mostrar Ubicación'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeView;