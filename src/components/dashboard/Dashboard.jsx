import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { apiService } from '../../services/api';
import { createWebSocketConnection, sendLocationUpdate } from '../../services/websocket';
import { startLocationTracking, stopLocationTracking } from '../../utils/geolocation';
import Header from '../layout/Header';
import Sidebar from '../layout/Sidebar';
import HomeView from './HomeView';
import MapPage from './MapPage';
import ContactsView from './ContactsView';
import DevicesView from './DevicesView';
import AboutView from './AboutView';

const Dashboard = ({ onGoHome }) => {
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
    const [currentView, setCurrentView] = useState('home');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [locations, setLocations] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [showAddContact, setShowAddContact] = useState(false);
    const [locationVisible, setLocationVisible] = useState(true);
    const [locationError, setLocationError] = useState('');
    const ws = useRef(null);
    const watchId = useRef(null);

    useEffect(() => {
        initializeLocation();
        connectWebSocket();

        return () => {
            if (ws.current) ws.current.close();
            stopLocationTracking(watchId.current);
        };
    }, []);

    const connectWebSocket = () => {
        ws.current = createWebSocketConnection(
            token,
            (data) => {
                if (data.type === 'location_update') {
                    updateLocationInList(data);
                }
            },
            (error) => {
                console.error('WebSocket error:', error);
            }
        );
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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
                        locations={locations}
                        userLocation={userLocation}
                        trustedContacts={trustedContacts}
                        devices={devices}
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

                {currentView === 'about' && <AboutView />}
            </main>
        </div>
    );
};

export default Dashboard;