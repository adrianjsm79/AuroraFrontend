import { WS_URL } from '../config';

export const createWebSocketConnection = (token, onMessage, onError) => {
  const websocket = new WebSocket(`${WS_URL}?token=${token}`);
  
  websocket.onopen = () => {
    console.log('WebSocket conectado');
  };

  websocket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (onMessage) onMessage(data);
  };

  websocket.onerror = (error) => {
    console.error('WebSocket error:', error);
    if (onError) onError(error);
  };

  return websocket;
};

export const sendLocationUpdate = (websocket, location) => {
  if (websocket && websocket.readyState === WebSocket.OPEN) {
    websocket.send(JSON.stringify({
      type: 'location_update',
      ...location,
    }));
  }
};