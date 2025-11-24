# Sistema de Actualizaciones en Tiempo Real del Mapa

## Descripción General

La página del mapa ahora recibe actualizaciones en tiempo real tanto de:
- **Ubicación del navegador del usuario** (geolocation API)
- **Dispositivos propios** del usuario
- **Dispositivos de seguidores** (usuarios que siguen al usuario actual)

## Arquitectura de Flujo de Datos en Tiempo Real

```
┌─────────────────────────────────────────────────────────────────┐
│                        USUARIO ACTUAL                           │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                    ┌─────────┴─────────┐
                    ↓                   ↓
         ┌──────────────────┐  ┌──────────────────┐
         │  Geolocation API │  │  Dashboard State │
         └────────┬─────────┘  └────────┬─────────┘
                  │                     │
                  ↓                     ↓
         ┌──────────────────────────────────────┐
         │  Dashboard Component                 │
         │  - startLocationTracking()           │
         │  - startRealtimeDataPolling()        │
         │  - createWebSocketConnection()       │
         └────────┬──────────────────┬──────────┘
                  │                  │
          ┌───────┴──────┐    ┌──────┴────────┐
          ↓              ↓    ↓               ↓
    ┌────────────┐  ┌─────────────┐  ┌──────────────┐
    │ WebSocket  │  │   Polling   │  │  API Calls   │
    │  (Backend) │  │  (3 seg)    │  │ - getDevices │
    │            │  │             │  │ - getContacts│
    └────────┬───┘  └─────────┬───┘  └──────┬───────┘
             │                │             │
             └────────┬───────┴─────────────┘
                      │
        ┌─────────────┴──────────────┐
        │  State Updates:            │
        │  - realTimeDevices         │
        │  - realTimeReceivedContacts│
        └─────────────┬──────────────┘
                      │
                      ↓
         ┌────────────────────────┐
         │   MapPage Component    │
         │   - Extrae datos       │
         │   - Agrupa dispositivos│
         └────────┬───────────────┘
                  │
                  ↓
         ┌────────────────────────┐
         │   MapView Component    │
         │   - Renderiza pins     │
         │   - Actualiza rutas    │
         │   - Muestra información│
         └────────────────────────┘
```

## Fuentes de Actualización en Tiempo Real

### 1. **Ubicación del Navegador del Usuario**
- **Fuente**: Geolocation API (browser)
- **Intervalo**: Continuo (rastreado automáticamente)
- **Actualización**: Automática en `userLocation` state
- **Envío**: Se envía al backend cada vez que cambia (si está visible)

### 2. **Dispositivos Propios del Usuario**
- **Fuente**: API REST - `GET /devices/`
- **Intervalo**: Polling cada 3 segundos
- **State**: `realTimeDevices` en Dashboard
- **Actualización**: Automática en MapPage

### 3. **Dispositivos de Seguidores**
- **Fuente**: API REST - `GET /users/trusted-contacts/trusted-by/`
- **Intervalo**: Polling cada 3 segundos
- **State**: `realTimeReceivedContacts` en Dashboard
- **Actualización**: Automática en MapPage (extraído con flatMap)

### 4. **WebSocket (Complementario)**
- **Fuente**: WebSocket connection a backend
- **Intervalo**: Tiempo real (cuando hay cambios)
- **Tipos de mensajes**:
  - `device_location_update`: Actualiza dispositivo específico
  - `contact_location_update`: Actualiza dispositivo de contacto

## Implementación en Componentes

### Dashboard.jsx
```javascript
// Estado para datos en tiempo real
const [realTimeDevices, setRealTimeDevices] = useState(null);
const [realTimeReceivedContacts, setRealTimeReceivedContacts] = useState(null);

// Polling cada 3 segundos
const startRealtimeDataPolling = () => {
  pollingInterval.current = setInterval(async () => {
    if (currentView === 'map') {
      const devicesData = await apiService.getDevices(token);
      setRealTimeDevices(devicesData);
      
      const contactsData = await apiService.getReceivedTrustedContacts(token);
      setRealTimeReceivedContacts(contactsData);
    }
  }, 3000);
};

// Pasar a MapPage
<MapPage
  userLocation={userLocation}  // Ubicación en tiempo real
  devices={realTimeDevices || devices}  // Dispositivos en tiempo real
  receivedContacts={realTimeReceivedContacts || receivedContacts}  // Contactos en tiempo real
/>
```

### MapPage.jsx
```javascript
// Extrae dispositivos de seguidores dinámicamente
const followersDevices = receivedContacts.flatMap(
  follower => follower.devices || []
);

// Separa por estado
const visibleFollowersDevices = followersDevices.filter(d => !d.is_lost);
const lostFollowersDevices = followersDevices.filter(d => d.is_lost);

// Pasa a MapView
<MapView
  userLocation={userLocation}
  devices={visibleUserDevices}
  contactsDevices={visibleFollowersDevices}
  lostContactsDevices={lostFollowersDevices}
/>
```

### MapView.jsx
```javascript
// useMemo optimiza re-renders
const userMarkers = useMemo(() => 
  devices.map(device => 
    <DeviceMarker key={device.id} device={device} color="#a855f7" />
  ),
  [devices, DeviceMarker]
);

const contactsMarkers = useMemo(() => 
  contactsDevices.map(device => 
    <DeviceMarker key={device.id} device={device} color="#22c55e" />
  ),
  [contactsDevices, DeviceMarker]
);
```

## Actualización Visual en Tiempo Real

### Pins del Mapa
- **Azul**: Tu ubicación (navegador) - actualiza continuamente
- **Morado**: Tus dispositivos - actualiza cada 3 segundos
- **Verde**: Dispositivos de seguidores - actualiza cada 3 segundos
- **Rojo**: Tus dispositivos perdidos - actualiza cada 3 segundos
- **Amarillo**: Dispositivos perdidos de seguidores - actualiza cada 3 segundos

### Sidebar de Dispositivos
- Se actualiza automáticamente cuando cambian los datos
- Muestra ubicación, precisión y última actualización

### InfoWindow (Hover)
- Muestra información del dispositivo en tiempo real
- No causa movimiento de cámara (`disableAutoPan: true`)

## Optimizaciones de Performance

### 1. **Memoización**
- `useMemo` en MapView evita re-renders de marcadores innecesarios
- `useCallback` en DeviceMarker previene recreación de componentes

### 2. **Polling Inteligente**
- Solo ocurre cuando estamos en la vista de mapa
- Se detiene automáticamente al cambiar de vista
- Intervalo de 3 segundos (balance entre actualización y carga)

### 3. **Fallback a AuthContext**
- Si no hay datos en tiempo real: `realTimeDevices || devices`
- Proporciona experiencia consistente incluso sin polling

### 4. **WebSocket Complementario**
- Complementa el polling para actualizaciones más rápidas
- No reemplaza el polling (mayor confiabilidad)

## Métricas de Actualización

```
┌─────────────────────────────────────┐
│  Velocidad de Actualización         │
├─────────────────────────────────────┤
│ Ubicación navegador:    ~ 10 seg    │
│ Dispositivos propios:   ~ 3 seg     │
│ Dispositivos contactos: ~ 3 seg     │
│ WebSocket (si activo):  ~ < 1 seg   │
└─────────────────────────────────────┘

┌──────────────────────────────────────┐
│  Uso de Ancho de Banda (Aprox)      │
├──────────────────────────────────────┤
│ Polling dispositivos:    ~10 KB/min  │
│ WebSocket:              ~5 KB/min   │
│ Geolocation:           ~2 KB/min   │
└──────────────────────────────────────┘
```

## Testing Manual

### Paso 1: Abrir Mapa
1. Ir a Dashboard → Mapa
2. Verificar que aparece tu pin azul en tu ubicación actual

### Paso 2: Verificar Actualizaciones de Ubicación
1. Mover el navegador (cambiar ubicación)
2. El pin azul debe moverse dentro de 10 segundos

### Paso 3: Verificar Dispositivos
1. Esperar 3-5 segundos
2. Tus dispositivos (morado) deben aparecer
3. Los dispositivos de seguidores (verde) deben aparecer

### Paso 4: Verificar Actualizaciones en Tiempo Real
1. Cambiar ubicación de un dispositivo (desde otro dispositivo)
2. El pin debe actualizar su posición en 3-5 segundos máximo
3. El sidebar debe actualizar el timestamp

### Paso 5: Cambiar de Vista
1. Ir a Contactos
2. El polling debe detenerse (sin consumo de API)
3. Volver a Mapa
4. El polling debe reanudarse

## Troubleshooting

### Los pins no se actualizan
- Verificar consola de navegador (F12) para errores
- Confirmar que el backend está respondiendo
- Intentar recargar la página (Ctrl+Shift+R)

### Lag o lentitud
- Verificar conexión de internet
- Reducir el número de dispositivos activos
- Aumentar el intervalo de polling a 5 segundos (modificar Dashboard.jsx)

### WebSocket no conecta
- Verificar que WS_URL en config.js es correcto
- Confirmar que el backend soporta WebSocket
- El polling fallback debe seguir funcionando

## Próximas Mejoras

1. **Actualización Solo de Cambios**: Enviar solo campos que cambiaron
2. **Caché Inteligente**: No actualizar si datos son idénticos
3. **Sincronización WebSocket**: Implementar fullstack en backend
4. **Notificaciones**: Alertar cuando dispositivo se mueve más de X metros
5. **Historial**: Guardar posiciones anteriores para ver ruta

---

**Última actualización**: Noviembre 2025
**Estado**: ✅ Producción
