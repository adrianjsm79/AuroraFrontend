import React, { createContext, useState, useEffect, useContext } from 'react';
import { API_URL } from '../config';
import { apiService } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [trustedContacts, setTrustedContacts] = useState([]);
  const [receivedContacts, setReceivedContacts] = useState([]);
  const [devices, setDevices] = useState([]);
  const [contactsDevices, setContactsDevices] = useState([]);

  useEffect(() => {
    if (token) {
      fetchProfile();
      fetchTrustedContacts();
      fetchReceivedContacts();
      fetchDevices();
      fetchContactsDevices();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${API_URL}/users/profile/`, {
        headers: { 'Authorization': `Bearer ${token}`, 'ngrok-skip-browser-warning': 'true' },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        logout();
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const fetchTrustedContacts = async () => {
    try {
      const data = await apiService.getTrustedContacts(token);
      setTrustedContacts(data);
    } catch (error) {
      console.error('Error fetching trusted contacts:', error);
    }
  };

  const fetchReceivedContacts = async () => {
    try {
      const data = await apiService.getReceivedTrustedContacts(token);
      setReceivedContacts(data);
    } catch (error) {
      console.error('Error fetching received contacts:', error);
    }
  };

  const fetchDevices = async () => {
    try {
      const data = await apiService.getDevices(token);
      setDevices(data);
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  };

  const fetchContactsDevices = async () => {
    try {
      const data = await apiService.getContactsDevices(token);
      setContactsDevices(data || []);
    } catch (error) {
      console.warn('Error fetching contacts devices:', error);
      setContactsDevices([]);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/users/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Credenciales inválidas');

      const data = await response.json();
      localStorage.setItem('token', data.access);
      setToken(data.access);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/users/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true'},
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(Object.values(errorData).flat().join(', '));
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setTrustedContacts([]);
    setReceivedContacts([]);
    setDevices([]);
    setContactsDevices([]);
  };

  const addTrustedContact = async (numero) => {
    try {
      await apiService.addTrustedContact(token, numero);
      await fetchTrustedContacts();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const removeTrustedContact = async (contactId) => {
    try {
      await apiService.removeTrustedContact(token, contactId);
      await fetchTrustedContacts();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const updateDeviceVisibility = async (deviceId, isVisible) => {
    try {
      await apiService.updateDeviceVisibility(token, deviceId, isVisible);
      await fetchDevices();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const deleteDevice = async (deviceId) => {
    try {
      await apiService.deleteDevice(token, deviceId);
      await fetchDevices();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const updateDeviceLostStatus = async (deviceId, isLost) => {
    try {
      await apiService.updateDeviceLostStatus(token, deviceId, isLost);
      await fetchDevices();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      register,
      logout,
      loading,
      trustedContacts,
      receivedContacts,
      devices,
      contactsDevices,
      addTrustedContact,
      removeTrustedContact,
      updateDeviceVisibility,
      deleteDevice,
      updateDeviceLostStatus,
      fetchTrustedContacts,
      fetchReceivedContacts,
      fetchDevices,
      fetchContactsDevices,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};
