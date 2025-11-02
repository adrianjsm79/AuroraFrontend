import React from 'react';
import { Navigation } from 'lucide-react';
import MapView from '../map/MapView';

const MapPage = ({ locations, userLocation, trustedContacts, fetchLocations }) => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Mapa de Ubicaciones</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Visualiza tu ubicación y la de tus {trustedContacts.length} contacto{trustedContacts.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={fetchLocations}
            className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-secondary transition flex items-center space-x-2"
          >
            <Navigation className="w-5 h-5" />
            <span>Actualizar</span>
          </button>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4" style={{ height: '70vh', minHeight: '500px' }}>
        <MapView 
          locations={locations} 
          userLocation={userLocation}
        />
      </div>

      {/* Leyenda */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mt-6">
        <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4">Leyenda</h3>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce"></div>
            <span className="text-sm text-gray-700 dark:text-gray-300">Tu ubicación</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-purple-600 rounded-full"></div>
            <span className="text-sm text-gray-700 dark:text-gray-300">Contactos de confianza</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-indigo-400 rounded-full bg-indigo-50"></div>
            <span className="text-sm text-gray-700 dark:text-gray-300">Área de precisión</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;