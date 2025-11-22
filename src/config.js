export const API_URL = process.env.REACT_APP_API_URL;
export const WS_URL = process.env.REACT_APP_WS_URL;
export const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY; //en .env: REACT_APP_GOOGLE_MAPS_API_KEY

export const MAP_CONFIG = {
  defaultCenter: { lat: -12.0464, lng: -77.0428 },
  defaultZoom: 13,
  options: {
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true,
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      }
    ]
  }
};

export const GEOLOCATION_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0
};