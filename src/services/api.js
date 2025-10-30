import { API_URL } from '../config';

export const apiService = {
  // Contactos
  async getTrustedContacts(token) {
    const response = await fetch(`${API_URL}/users/trusted-contacts/`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },

  async addTrustedContact(token, numero) {
    const response = await fetch(`${API_URL}/users/trusted-contacts/add/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
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
      headers: { 'Authorization': `Bearer ${token}` },
    });
  },

  // Ubicaciones
  async updateLocation(token, location) {
    await fetch(`${API_URL}/tracking/update/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(location),
    });
  },

  async getLocations(token) {
    const response = await fetch(`${API_URL}/tracking/locations/`, {
      headers: { 'Authorization': `Bearer ${token}` },
    });
    return response.json();
  },
};