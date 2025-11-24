import React from 'react';
import { MapPin } from 'lucide-react';

const LoadingScreen = () => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center">
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-2xl">
        <MapPin className="w-10 h-10 text-indigo-600 animate-pulse" />
      </div>
      <div className="loading-spinner mx-auto"></div>
      <p className="text-white mt-4 font-semibold">Cargando AuroraApp...</p>
    </div>
  </div>
);

export default LoadingScreen;