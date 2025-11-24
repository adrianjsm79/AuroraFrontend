import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';
import { createWebSocketConnection, sendLocationUpdate, subscribeToDeviceUpdates } from '../../services/websocket';
import { startLocationTracking, stopLocationTracking } from '../../utils/geolocation';
import Header from '../layout/Header';
import Sidebar from '../layout/Sidebar';
import HomeView from './HomeView';
import MapPage from './MapPage';
import ContactsView from './ContactsView';
import DevicesView from './DevicesView';
import AccountView from './AccountView';
import AboutView from './AboutView';

const Dashboard = ({ onGoHome }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { 
        user, 
        token, 
        logout,
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
        fetchContactsDevices
    } = useAuth();

    // Determinar la vista actual basada en la URL
    const getViewFromPath = () => {
        const path = location.pathname.replace('/dashboard/', '').trim();
        return path || 'homeview';
    };

    const currentView = getViewFromPath();

    const setCurrentView = (viewId) => {
        if (viewId === 'homeview') {
            navigate('/dashboard/homeview');
        } else {
            navigate(`/dashboard/${viewId}`);
        }
    };

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [locations, setLocations] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [showAddContact, setShowAddContact] = useState(false);
    const [locationVisible, setLocationVisible] = useState(true);
    const [locationError, setLocationError] = useState('');
    const [realTimeDevices, setRealTimeDevices] = useState(null); // Estado para dispositivos en tiempo real
    const [realTimeReceivedContacts, setRealTimeReceivedContacts] = useState(null); // Estado para contactos en tiempo real
    const ws = useRef(null);
    const watchId = useRef(null);
    const pollingInterval = useRef(null); // Para polling fallback

    useEffect(() => {
        initializeLocation();
        connectWebSocket();
        startRealtimeDataPolling();

        return () => {
            if (ws.current) ws.current.close();
            stopLocationTracking(watchId.current);
            if (pollingInterval.current) clearInterval(pollingInterval.current);
        };
    }, []);

    const connectWebSocket = () => {
        ws.current = createWebSocketConnection(
            token,
            (data) => {
                if (data.type === 'location_update') {
                    updateLocationInList(data);
                }
                // Actualizaciones de dispositivos en tiempo real
                else if (data.type === 'device_location_update') {
                    updateDeviceLocationInRealTime(data);
                }
                // Actualizaciones de contactos/seguidores en tiempo real
                else if (data.type === 'contact_location_update') {
                    updateContactLocationInRealTime(data);
                }
            },
            (error) => {
                console.error('WebSocket error:', error);
            }
        );
    };

    /**
     * Actualiza la ubicación de un dispositivo en tiempo real
     */
    const updateDeviceLocationInRealTime = (data) => {
        setRealTimeDevices((prev) => {
            if (!prev) return null;
            return prev.map((device) =>
                device.id === data.device_id
                    ? {
                        ...device,
                        latitude: data.latitude,
                        longitude: data.longitude,
                        accuracy: data.accuracy,
                        last_seen: data.timestamp || new Date().toISOString(),
                    }
                    : device
            );
        });
    };

    /**
     * Actualiza la ubicación de un dispositivo de un contacto/seguidor en tiempo real
     */
    const updateContactLocationInRealTime = (data) => {
        setRealTimeReceivedContacts((prev) => {
            if (!prev) return null;
            return prev.map((contact) => ({
                ...contact,
                devices: (contact.devices || []).map((device) =>
                    device.id === data.device_id
                        ? {
                            ...device,
                            latitude: data.latitude,
                            longitude: data.longitude,
                            accuracy: data.accuracy,
                            last_seen: data.timestamp || new Date().toISOString(),
                        }
                        : device
                ),
            }));
        });
    };

    const initializeLocation = () => {
        watchId.current = startLocationTracking(
            (newLocation) => {
                setUserLocation(newLocation);
                setLocationError('');

                if (locationVisible) {
                    sendLocationToBackend(newLocation);
                }
            },
            (error) => {
                setLocationError(error);
            }
        );
    };

    const sendLocationToBackend = async (location) => {
        try {
            await apiService.updateLocation(token, {
                latitude: location.latitude,
                longitude: location.longitude,
                accuracy: location.accuracy
            });

            sendLocationUpdate(ws.current, {
                latitude: location.latitude,
                longitude: location.longitude,
                accuracy: location.accuracy,
            });
        } catch (error) {
            console.error('Error enviando ubicación:', error);
        }
    };

    const updateLocationInList = (locationData) => {
        setLocations((prev) => {
            const filtered = prev.filter((loc) => loc.user_id !== locationData.user_id);
            return [...filtered, {
                user_id: locationData.user_id,
                nombre: locationData.nombre,
                latitude: locationData.latitude,
                longitude: locationData.longitude,
                accuracy: locationData.accuracy,
                timestamp: new Date().toISOString(),
                isCurrentUser: false,
            }];
        });
    };

    /**
     * Inicia el polling para obtener actualizaciones de datos en tiempo real
     * Esto complementa WebSocket y proporciona un fallback confiable
     */
    const startRealtimeDataPolling = () => {
        console.log('🔄 Iniciando polling en tiempo real (cada 1 segundo)');
        // Polling cada 1 segundo para actualizaciones prácticamente instantáneas
        // de ubicaciones, estados (is_lost), timestamps (last_seen), etc.
        pollingInterval.current = setInterval(async () => {
            try {
                // Solo hacer polling si estamos en la vista de mapa
                if (currentView === 'map') {
                    // Actualizar dispositivos propios SIEMPRE (para last_seen, is_lost, etc)
                    const devicesData = await apiService.getDevices(token);
                    setRealTimeDevices(devicesData);
                    console.log(`📱 Dispositivos actualizados (${devicesData?.length || 0}):`, devicesData?.map(d => ({
                        id: d.id,
                        name: d.name,
                        is_lost: d.is_lost,
                        last_seen: d.last_seen,
                        lat: d.latitude?.toFixed(2),
                        lng: d.longitude?.toFixed(2)
                    })));

                    // Actualizar contactos/seguidores y sus dispositivos SIEMPRE
                    const contactsData = await apiService.getReceivedTrustedContacts(token);
                    setRealTimeReceivedContacts(contactsData);
                    const totalDevices = contactsData?.reduce((sum, contact) => sum + (contact.devices?.length || 0), 0) || 0;
                    console.log(`👥 Seguidores actualizados (${contactsData?.length || 0}, ${totalDevices} dispositivos):`, 
                        contactsData?.map(contact => ({
                            nombre: contact.nombre,
                            devicesCount: contact.devices?.length || 0,
                            devices: contact.devices?.map(d => ({
                                id: d.id,
                                name: d.name,
                                is_lost: d.is_lost,
                                last_seen: d.last_seen,
                                lat: d.latitude?.toFixed(2),
                                lng: d.longitude?.toFixed(2)
                            }))
                        }))
                    );
                }
            } catch (error) {
                console.error('❌ Error en polling de datos en tiempo real:', error);
            }
        }, 1000); // 1 segundo - actualizaciones prácticamente en tiempo real
    };

    const fetchLocations = async () => {
        try {
            const data = await apiService.getLocations(token);
            const formattedLocations = data.map((loc) => ({
                user_id: loc.device.user.id,
                nombre: loc.device.user.nombre,
                email: loc.device.user.email,
                numero: loc.device.user.numero,
                latitude: loc.latitude,
                longitude: loc.longitude,
                accuracy: loc.accuracy,
                timestamp: loc.timestamp,
                isCurrentUser: loc.device.user.id === user.id,
                isBrowserDevice: loc.is_browser_device,
                deviceName: loc.device.name,
                deviceIdentifier: loc.device.device_identifier,
                isLost: loc.device.is_lost,
                isVisible: loc.device.is_visible_to_contacts,
            }));
            setLocations(formattedLocations);
        } catch (error) {
            console.error('Error obteniendo ubicaciones:', error);
        }
    };

    useEffect(() => {
        if (currentView === 'map') {
            fetchLocations();
            // Asegurarse de que tenemos datos en tiempo real cuando entramos al mapa
            if (!realTimeDevices) {
                apiService.getDevices(token).then(setRealTimeDevices);
            }
            if (!realTimeReceivedContacts) {
                apiService.getReceivedTrustedContacts(token).then(setRealTimeReceivedContacts);
            }
        }
    }, [currentView]);

    const toggleLocationVisibility = () => {
        setLocationVisible(!locationVisible);
        if (!locationVisible && userLocation) {
            sendLocationToBackend(userLocation);
        }
    };

    const centerOnUserLocation = () => {
        if (userLocation) {
            setCurrentView('map');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
            <Header
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                onLogout={logout}
                onGoHome={onGoHome}
            />
            <Sidebar
                sidebarOpen={sidebarOpen}
                currentView={currentView}
                setCurrentView={setCurrentView}
                setSidebarOpen={setSidebarOpen}
                user={user}
                trustedContacts={trustedContacts}
                locationVisible={locationVisible}
            />

            <main className="pt-20 pb-8 px-4 md:px-8 lg:px-12">
                {currentView === 'home' && (
                    <HomeView
                        user={user}
                        userLocation={userLocation}
                        locationVisible={locationVisible}
                        locationError={locationError}
                        trustedContacts={trustedContacts}
                        ws={ws}
                        toggleLocationVisibility={toggleLocationVisibility}
                        centerOnUserLocation={centerOnUserLocation}
                        setCurrentView={setCurrentView}
                        setShowAddContact={setShowAddContact}
                    />
                )}

                {currentView === 'map' && (
                    <MapPage
                        userLocation={userLocation}
                        user={user}
                        receivedContacts={realTimeReceivedContacts || receivedContacts}
                        devices={realTimeDevices || devices}
                        contactsDevices={contactsDevices}
                        fetchLocations={fetchLocations}
                    />
                )}

                {currentView === 'contacts' && (
                    <ContactsView
                        trustedContacts={trustedContacts}
                        receivedContacts={receivedContacts}
                        showAddContact={showAddContact}
                        setShowAddContact={setShowAddContact}
                        addTrustedContact={addTrustedContact}
                        removeTrustedContact={removeTrustedContact}
                    />
                )}

                {currentView === 'devices' && (
                    <DevicesView
                        devices={devices}
                        updateDeviceVisibility={updateDeviceVisibility}
                        deleteDevice={deleteDevice}
                        updateDeviceLostStatus={updateDeviceLostStatus}
                    />
                )}

                {currentView === 'account' && (
                    <AccountView
                        user={user}
                        onLogout={() => {
                            logout();
                            onGoHome();
                        }}
                    />
                )}

                {currentView === 'about' && <AboutView />}
            </main>
        </div>
    );
};

export default Dashboard;