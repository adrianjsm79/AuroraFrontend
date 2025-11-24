import React, { useState } from 'react';
import { Smartphone, Eye, EyeOff, Trash2, MapPin, Clock, AlertCircle, AlertTriangle, Lock, Zap, CheckCircle, Shield } from 'lucide-react';

const DevicesView = ({ devices, updateDeviceVisibility, deleteDevice, updateDeviceLostStatus }) => {
  const [deletingId, setDeletingId] = useState(null);
  const [markingLostId, setMarkingLostId] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleToggleVisibility = async (deviceId, currentVisibility) => {
    const result = await updateDeviceVisibility(deviceId, !currentVisibility);
    if (!result.success) {
      console.error('Error updating device visibility:', result.error);
    }
  };

  const handleDelete = async (deviceId) => {
    const result = await deleteDevice(deviceId);
    if (!result.success) {
      console.error('Error deleting device:', result.error);
    }
    setDeletingId(null);
  };

  const handleMarkLost = async (deviceId, currentLostStatus) => {
    if (updateDeviceLostStatus) {
      const result = await updateDeviceLostStatus(deviceId, !currentLostStatus);
      if (!result.success) {
        console.error('Error updating device lost status:', result.error);
      }
    }
    setMarkingLostId(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
        <div className="mb-6">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Mis Dispositivos</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Gestiona la visibilidad de tus dispositivos</p>
            </div>
          </div>
        </div>

        {devices.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full mb-4">
              <Smartphone className="w-10 h-10 text-gray-400 dark:text-gray-500" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-lg font-semibold">No tienes dispositivos registrados</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">Para registrar un dispositivo:</p>
            <div className="mt-4 p-6 bg-blue-50 dark:bg-blue-900/30 border-2 border-blue-200 dark:border-blue-800 rounded-xl max-w-md mx-auto">
              <ol className="text-left space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-blue-600 text-white text-xs font-bold">1</span>
                  <span>Descarga la aplicación móvil de Aurora</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-blue-600 text-white text-xs font-bold">2</span>
                  <span>Inicia sesión con tu cuenta</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-blue-600 text-white text-xs font-bold">3</span>
                  <span>Tu dispositivo se registrará automáticamente</span>
                </li>
              </ol>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {devices.map((device, index) => (
              <div
                key={device.id}
                className="p-6 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:bg-gray-700 rounded-xl transition-all transform hover:scale-102 shadow-sm hover:shadow-md"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Nombre y estado */}
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg">
                        <Smartphone className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{device.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          ID: <span className="font-mono text-xs">{device.device_identifier.substring(0, 16)}...</span>
                        </p>
                      </div>
                      {device.is_lost && (
                        <div className="flex items-center space-x-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-3 py-1 rounded-full">
                          <AlertCircle className="w-4 h-4" />
                          <span className="text-sm font-semibold">Reportado perdido</span>
                        </div>
                      )}
                    </div>

                    {/* Información de ubicación */}
                    {device.latitude && device.longitude ? (
                      <div className="grid grid-cols-2 gap-4 mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          <div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Ubicación</p>
                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                              {device.latitude.toFixed(4)}, {device.longitude.toFixed(4)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-secondary" />
                          <div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Última actualización</p>
                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                              {formatDate(device.last_seen)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                          Sin ubicación registrada aún
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Controles */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Visible para contactos:</span>
                    <span className={`text-sm font-semibold ${
                      device.is_visible_to_contacts 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {device.is_visible_to_contacts ? 'Sí' : 'No'}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleToggleVisibility(device.id, device.is_visible_to_contacts)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all transform hover:scale-105 ${
                        device.is_visible_to_contacts
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50'
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                      }`}
                      title={device.is_visible_to_contacts ? 'Ocultar a contactos' : 'Mostrar a contactos'}
                    >
                      {device.is_visible_to_contacts ? (
                        <>
                          <Eye className="w-4 h-4" />
                          <span className="text-sm font-semibold">Visible</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-4 h-4" />
                          <span className="text-sm font-semibold">Oculto</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => setMarkingLostId(device.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all transform hover:scale-105 ${
                        device.is_lost
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50'
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                      }`}
                      title={device.is_lost ? 'Marcar como encontrado' : 'Marcar como perdido'}
                    >
                      {device.is_lost ? (
                        <>
                          <AlertTriangle className="w-4 h-4" />
                          <span className="text-sm font-semibold">Perdido</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-4 h-4" />
                          <span className="text-sm font-semibold">Marcar perdido</span>
                        </>
                      )}
                    </button>

                    {deletingId === device.id ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">¿Estás seguro?</span>
                        <button
                          onClick={() => handleDelete(device.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
                        >
                          Confirmar
                        </button>
                        <button
                          onClick={() => setDeletingId(null)}
                          className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-colors"
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeletingId(device.id)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all transform hover:scale-110"
                        title="Eliminar dispositivo"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Confirmación para marcar como perdido */}
                {markingLostId === device.id && (
                  <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-red-800 dark:text-red-200">
                        {device.is_lost ? '¿Marcar este dispositivo como encontrado?' : '¿Marcar este dispositivo como perdido?'}
                      </p>
                      <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                        {device.is_lost 
                          ? 'Se dejará de mostrar como perdido en el sistema.'
                          : 'Tus contactos sabrán que este dispositivo está perdido.'
                        }
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleMarkLost(device.id, device.is_lost)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                      >
                        Confirmar
                      </button>
                      <button
                        onClick={() => setMarkingLostId(null)}
                        className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-xl p-6 text-white">
        <h3 className="font-bold text-xl mb-3 flex items-center gap-2"><Shield className="w-5 h-5" /> Privacidad de Dispositivos</h3>
        <p className="text-white/80 mb-3">
          Controla qué dispositivos compartir con tus contactos de confianza. Puedes ocultar dispositivos específicos 
          para mantener ciertas ubicaciones privadas.
        </p>
        <ul className="space-y-2 text-sm text-white/70">
          <li>• Solo tus contactos de confianza verán tus dispositivos visibles</li>
          <li>• Puedes cambiar la visibilidad en cualquier momento</li>
          <li>• Los dispositivos ocultos no aparecerán en sus mapas</li>
        </ul>
      </div>

      <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-xl p-6 text-white mt-6">
        <h3 className="font-bold text-xl mb-4 flex items-center">
          <AlertTriangle className="w-6 h-6 mr-3" />
          Protocolo de Dispositivo Perdido
        </h3>
        <div className="space-y-3 text-sm text-red-50">
          <p className="font-semibold text-lg">Cuando marcas un dispositivo como perdido:</p>
          <ul className="space-y-3 ml-4">
            <li className="flex items-start space-x-3">
              <AlertTriangle className="flex-shrink-0 w-5 h-5 text-red-500" />
              <span><strong>Alerta Inmediata:</strong> Todos tus contactos que te siguen serán notificados de que tu dispositivo está perdido</span>
            </li>
            <li className="flex items-start space-x-3">
              <MapPin className="flex-shrink-0 w-5 h-5 text-blue-500" />
              <span><strong>Rastreo Activo:</strong> La ubicación del dispositivo se actualiza constantemente y es compartida con tus contactos</span>
            </li>
            <li className="flex items-start space-x-3">
              <Zap className="flex-shrink-0 w-5 h-5 text-yellow-500" />
              <span><strong>Indicador Visual:</strong> El dispositivo mostrará un badge "Reportado perdido" en todos los mapas</span>
            </li>
            <li className="flex items-start space-x-3">
              <Lock className="flex-shrink-0 w-5 h-5 text-purple-500" />
              <span><strong>Privar de Acceso:</strong> Se recomienda cambiar contraseñas y desactivar aplicaciones críticas remotamente</span>
            </li>
            <li className="flex items-start space-x-3">
              <CheckCircle className="flex-shrink-0 w-5 h-5 text-green-500" />
              <span><strong>Marcar como Encontrado:</strong> Cuando recuperes el dispositivo, cambia el estado a encontrado</span>
            </li>
          </ul>
          <div className="mt-4 pt-4 border-t border-red-400 border-opacity-50">
            <p className="text-xs text-red-100 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>No compartas esta información públicamente. Solo tus contactos de confianza pueden ver esta alerta.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevicesView;
