# Sistema de Seguimiento de Rutas en Tiempo Real

## 🗺️ Descripción General

Se ha implementado un sistema completo de seguimiento de rutas que se actualiza en **tiempo real** cuando:
- El usuario se mueve
- El dispositivo seleccionado se mueve
- Se selecciona un nuevo dispositivo

La ruta se recalcula **automáticamente** cada segundo (junto con el polling de ubicaciones) para proporcionar información actualizada de distancia y tiempo estimado.

## 🎯 Funcionalidades

### 1. Seleccionar un Dispositivo
```
Usuario hace click en un dispositivo → Se activa automáticamente la ruta
```

### 2. Ruta Dinámica
- Se dibuja una línea desde la ubicación del usuario hasta el dispositivo seleccionado
- Se actualiza en tiempo real conforme se mueven ambas ubicaciones
- Sigue la ruta de conducción más realista (no línea recta)

### 3. Información de Ruta
Muestra en un card en el sidebar:
- **Distancia**: Valor exacto en km/m
- **Tiempo Estimado**: ETA de llegada en auto
- Se actualiza cada segundo

### 4. Visualización Mejorada
- Línea blanca de contorno (para mejor visibilidad)
- Línea cyan principal con patrón visual
- Opacidad optimizada para no obstruir el mapa

## 📐 Arquitectura Técnica

```
┌─────────────────────────────────────────────────────────────┐
│                      Usuario selecciona dispositivo          │
└─────────────────────┬───────────────────────────────────────┘
                      ↓
        ┌─────────────────────────────────┐
        │     MapPage.jsx                 │
        │  - Captura: selectedDevice      │
        │  - Pasa callback: onRouteInfoChange
        └────────────┬────────────────────┘
                     ↓
        ┌─────────────────────────────────┐
        │     MapView.jsx                 │
        │  - useEffect: [selectedDevice,  │
        │      userLocation, map]         │
        │  - Calcula ruta con Google API  │
        │  - Extrae distancia y tiempo    │
        │  - Llama: onRouteInfoChange()   │
        └────────────┬────────────────────┘
                     ↓
        ┌─────────────────────────────────┐
        │     MapPage.jsx                 │
        │  - setRouteInfo(data)           │
        │  - Renderiza Card con info      │
        │  - Muestra en sidebar           │
        └─────────────────────────────────┘
```

## 🔄 Flujo de Actualización en Tiempo Real

```
Cada 1 segundo (Polling en Dashboard):
↓
Ubic. usuario cambia → Datos de dispositivos actualizados
↓
MapView detecta cambio en userLocation o selectedDevice
↓
Google Directions API recalcula ruta
↓
routeInfo se actualiza con nueva distancia y tiempo
↓
Card en sidebar refleja cambios instantáneamente
```

## 💻 Componentes Modificados

### MapView.jsx
```javascript
// Props nuevos
const MapView = ({ 
  ...
  onRouteInfoChange = null // Callback para notificar cambios de ruta
})

// Estado nuevo
const [routeInfo, setRouteInfo] = useState(null);

// Efecto mejorado
useEffect(() => {
  if (selectedDevice && userLocation && map) {
    // Calcula ruta con Google Directions Service
    // Extrae: distancia, tiempo estimado
    // Llama: onRouteInfoChange(routeData)
  }
}, [selectedDevice, userLocation, map, onRouteInfoChange]);

// Polyline mejorada
<Polyline path={route} options={{ 
  strokeColor: '#ffffff', // Contorno
  strokeWeight: 6,
  strokeOpacity: 0.4,
}} />
<Polyline path={route} options={{ 
  strokeColor: '#01D9F6', // Principal
  strokeWeight: 3,
  strokeOpacity: 0.9,
}} />
```

### MapPage.jsx
```javascript
// Nuevo estado para info de ruta
const [routeInfo, setRouteInfo] = useState(null);

// Nuevos iconos importados
import { Navigation2, Clock, Zap } from 'lucide-react';

// Callback pasado a MapView
<MapView
  ...
  onRouteInfoChange={setRouteInfo}
/>

// Card de información
{selectedDevice && routeInfo && (
  <div className="bg-gradient-to-br from-blue-50 to-cyan-50">
    <h3>Ruta Calculada</h3>
    <div className="flex items-center justify-between">
      <span>Distancia</span>
      <span>{routeInfo.distance}</span>
    </div>
    <div className="flex items-center justify-between">
      <span>Tiempo EST.</span>
      <span>{routeInfo.duration}</span>
    </div>
  </div>
)}
```

## 📊 Información de Ruta Disponible

```json
{
  "distance": "2.5 km",
  "distanceValue": 2500,  // en metros
  "duration": "5 mins",
  "durationValue": 300    // en segundos
}
```

## 🎨 Visualización

### Card de Ruta en Sidebar
```
┌─ Ruta Calculada ─────────────┐
│                              │
│ ⚡ Distancia      |  2.5 km   │
│ 🕐 Tiempo EST.    |  5 mins   │
│                              │
│ Se actualiza en tiempo real  │
└──────────────────────────────┘
```

### Polyline en Mapa
```
Usuario (Pin Azul)
    \
     \ ← Línea blanca (contorno)
      \ ← Línea cyan (ruta principal)
       \
        \ Dispositivo (Pin Verde/Morado/etc)
```

## ⚡ Rendimiento y Optimizaciones

### 1. Recálculo Eficiente
- Solo se recalcula cuando hay cambios en:
  - `selectedDevice` (dispositivo cambia)
  - `userLocation` (usuario se mueve)
  - `map` (mapa carga)
- NO se recalcula en cada re-render

### 2. Callback Optimizado
- `onRouteInfoChange` solo se llama cuando:
  - Hay una ruta válida
  - Cambió la información (distancia/tiempo)
  - Se limpió la ruta

### 3. Renderización
- Card de ruta solo renderiza si:
  - Hay dispositivo seleccionado
  - Hay información de ruta disponible
- Las Polylines se memoizan

## 🔍 Testing Manual

### Paso 1: Seleccionar Dispositivo
1. Abrir mapa
2. Click en un dispositivo en el sidebar
3. Esperar a que aparezca la ruta

### Paso 2: Verificar Información
1. Debería aparecer card con:
   - Distancia exacta
   - Tiempo estimado
2. Formato: "X km", "X mins"

### Paso 3: Verificar Actualización en Tiempo Real
1. Mover a otro dispositivo
2. La ruta cambia instantáneamente
3. Card actualiza distancia y tiempo
4. Esperar a que cambie ubicación del navegador
5. La ruta se recalcula automáticamente

### Paso 4: Verificar Polylines
1. Línea debe ser visible y no muy gruesa
2. Color cyan brillante
3. Seguir ruta de conducción real (no línea recta)

## 🚨 Casos de Error

### Google Directions API falla
```
if (status !== 'OK') {
  console.error('Error calculating route:', status)
  setRouteInfo(null)
}
```

### No hay dispositivo seleccionado
```
routeInfo === null
Card no se renderiza
```

### Ubicación del usuario indefinida
```
route === null
No hay ruta que dibujar
```

## 📈 Métricas

```
Latencia de actualización:      ~1 segundo (con polling)
API calls por minuto:           2 (devices + contacts)
Recálculos de ruta por minuto:  1+ (cuando hay cambios)
Banda de ancho de ruta API:     ~2KB por request
```

## 🔮 Próximas Mejoras Posibles

1. **Rutas Alternativas**: Mostrar 2-3 rutas posibles
2. **Modo de Transporte**: Seleccionar entre auto/a pie/bici/transporte público
3. **Predicción**: Estimar dónde estará el dispositivo en X minutos
4. **Historial de Ruta**: Ver posiciones anteriores (breadcrumb trail)
5. **Notificaciones**: Alertar cuando el dispositivo se acerca/aleja
6. **Tráfico en Vivo**: Mostrar congestión en la ruta
7. **Puntos de Interés**: Mostrar lugares en la ruta

## 🐛 Debugging

Para ver logs detallados en consola:
```javascript
// Abre DevTools (F12) → Consola
// Busca logs con: "route", "Dispositivos", "Seguidores"

📱 Dispositivos actualizados: [...]
👥 Seguidores actualizados: [...]
✅ Ruta calculada exitosamente
```

---

**Última actualización**: Noviembre 2025
**Status**: ✅ Producción - Completamente funcional
