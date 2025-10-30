import { GEOLOCATION_OPTIONS } from '../config';

export const startLocationTracking = (onSuccess, onError) => {
  if (!('geolocation' in navigator)) {
    onError('Geolocalización no soportada');
    return null;
  }

  const watchId = navigator.geolocation.watchPosition(
    (position) => {
      const location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
      };
      onSuccess(location);
    },
    (error) => {
      let errorMsg = 'Error obteniendo ubicación';
      
      switch(error.code) {
        case error.PERMISSION_DENIED:
          errorMsg = 'Permiso de ubicación denegado';
          break;
        case error.POSITION_UNAVAILABLE:
          errorMsg = 'Ubicación no disponible';
          break;
        case error.TIMEOUT:
          errorMsg = 'Tiempo de espera agotado';
          break;
      }
      
      onError(errorMsg);
    },
    GEOLOCATION_OPTIONS
  );

  return watchId;
};

export const stopLocationTracking = (watchId) => {
  if (watchId) {
    navigator.geolocation.clearWatch(watchId);
  }
};