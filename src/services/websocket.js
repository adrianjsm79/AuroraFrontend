import { WS_URL } from '../config';

/**
 * Crea una conexión WebSocket para recibir actualizaciones en tiempo real
 * de ubicaciones de dispositivos y contactos
 */
export const createWebSocketConnection = (token, onMessage, onError) => {
  const websocket = new WebSocket(`${WS_URL}?token=${token}`);
  
  websocket.onopen = () => {
    console.log('WebSocket conectado - Escuchando actualizaciones en tiempo real');
  };

  websocket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('Mensaje WebSocket recibido:', data.type);
    if (onMessage) onMessage(data);
  };

  websocket.onerror = (error) => {
    console.error('WebSocket error:', error);
    if (onError) onError(error);
  };

  websocket.onclose = () => {
    console.log('WebSocket desconectado');
  };

  return websocket;
};

/**
 * Envía una actualización de ubicación del navegador del usuario
 */
export const sendLocationUpdate = (websocket, location) => {
  if (websocket && websocket.readyState === WebSocket.OPEN) {
    websocket.send(JSON.stringify({
      type: 'location_update',
      ...location,
    }));
  }
};

/**
 * Envía una solicitud para recibir actualizaciones de dispositivos específicos
 */
export const subscribeToDeviceUpdates = (websocket, deviceIds = []) => {
  if (websocket && websocket.readyState === WebSocket.OPEN) {
    websocket.send(JSON.stringify({
      type: 'subscribe_devices',
      device_ids: deviceIds,
    }));
  }
};