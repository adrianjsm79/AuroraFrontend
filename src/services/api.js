import { API_URL } from '../config';

export const apiService = {
  // Contactos
  async getTrustedContacts(token) {
    const response = await fetch(`${API_URL}/users/trusted-contacts/`, {
      headers: { 'Authorization': `Bearer ${token}`, 'ngrok-skip-browser-warning': 'true' }, 
    });
    return response.json();
  },

  async getReceivedTrustedContacts(token) {
    const response = await fetch(`${API_URL}/users/trusted-contacts/trusted-by/`, {
      headers: { 'Authorization': `Bearer ${token}`, 'ngrok-skip-browser-warning': 'true' }, 
    });
    return response.json();
  },

  async addTrustedContact(token, numero) {
    const response = await fetch(`${API_URL}/users/trusted-contacts/add/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify({ numero }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al agregar contacto');
    }
    
    return response.json();
  },

  async removeTrustedContact(token, contactId) {
    await fetch(`${API_URL}/users/trusted-contacts/${contactId}/remove/`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}`, 'ngrok-skip-browser-warning': 'true' },
    });
  },

  // Dispositivos
  async getDevices(token) {
    const response = await fetch(`${API_URL}/devices/`, {
      headers: { 'Authorization': `Bearer ${token}`, 'ngrok-skip-browser-warning': 'true' },
    });
    return response.json();
  },

  async getContactsDevices(token) {
    try {
      const response = await fetch(`${API_URL}/devices/contacts_devices/`, {
        headers: { 'Authorization': `Bearer ${token}`, 'ngrok-skip-browser-warning': 'true' },
      });
      
      if (!response.ok) {
        console.warn('Error fetching contacts devices:', response.status);
        return []; // Devuelve array vacío en caso de error
      }
      
      return response.json();
    } catch (error) {
      console.warn('Error parsing contacts devices:', error);
      return []; // Devuelve array vacío si hay error de parsing
    }
  },

  async updateDeviceVisibility(token, deviceId, isVisible) {
    const response = await fetch(`${API_URL}/devices/${deviceId}/update_visibility/`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify({ is_visible_to_contacts: isVisible }),
    });
    return response.json();
  },

  async deleteDevice(token, deviceId) {
    await fetch(`${API_URL}/devices/${deviceId}/`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}`, 'ngrok-skip-browser-warning': 'true' },
    });
  },

  async updateDeviceLostStatus(token, deviceId, isLost) {
    const response = await fetch(`${API_URL}/devices/${deviceId}/update_lost_status/`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify({ is_lost: isLost }),
    });
    return response.json();
  },

  // Ubicaciones
  async updateLocation(token, location) {
    await fetch(`${API_URL}/tracking/update/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify(location),
    });
  },

  async getLocations(token) {
    const response = await fetch(`${API_URL}/tracking/locations/`, {
      headers: { 'Authorization': `Bearer ${token}`, 'ngrok-skip-browser-warning': 'true' },
    });
    return response.json();
  },
};
