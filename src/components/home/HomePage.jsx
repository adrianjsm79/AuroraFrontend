import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const HomePage = ({ onLoginClick, onDashboardClick }) => {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();

  const bgClass = isDarkMode ? 'bg-dark-background' : 'bg-light-background';
  const textPrimaryClass = isDarkMode ? 'text-dark-text-primary' : 'text-light-text-primary';
  const textSecondaryClass = isDarkMode ? 'text-dark-text-secondary' : 'text-light-text-secondary';
  const surfaceClass = isDarkMode
    ? 'bg-dark-surface border border-dark-secondary-surface'
    : 'bg-light-surface border border-light-secondary-surface';

  return (
    <div className={`${bgClass} transition-colors duration-300 min-h-screen flex flex-col`}>
      {/* Hero Section */}
      <section className={`${isDarkMode ? 'bg-gradient-to-b from-dark-secondary-surface to-dark-background' : 'bg-gradient-to-b from-light-secondary-surface to-light-background'} py-16 md:py-24`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-6 inline-block">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-white font-bold text-4xl">A</span>
              </div>
            </div>

            <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${textPrimaryClass}`}>
              Tu Seguridad es
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Nuestra Prioridad</span>
            </h1>

            <p className={`text-xl md:text-2xl mb-8 max-w-2xl mx-auto ${textSecondaryClass}`}>
              Aurora: Monitoreo en tiempo real de la ubicación de tus seres queridos con la máxima seguridad y privacidad.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!user ? (
                <>
                  <button
                    onClick={onLoginClick}
                    className="px-8 py-4 bg-primary hover:bg-opacity-90 text-white font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Iniciar Sesión
                  </button>
                  <button
                    onClick={onLoginClick}
                    className={`px-8 py-4 font-bold rounded-lg transition-all duration-200 border-2 border-primary ${isDarkMode ? 'bg-dark-surface hover:bg-dark-secondary-surface' : 'bg-light-surface hover:bg-light-secondary-surface'} text-primary`}
                  >
                    Crear Cuenta
                  </button>
                </>
              ) : (
                <button
                  onClick={onDashboardClick}
                  className="px-8 py-4 bg-primary hover:bg-opacity-90 text-white font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Ir al Dashboard
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${textPrimaryClass}`}>
              Características Principales
            </h2>
            <p className={`text-lg ${textSecondaryClass} max-w-2xl mx-auto`}>
              Todo lo que necesitas para mantener a tu familia segura
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className={`${surfaceClass} rounded-xl p-8 hover:shadow-lg transition-all duration-300`}>
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className={`text-xl font-bold mb-3 ${textPrimaryClass}`}>
                Localización en Tiempo Real
              </h3>
              <p className={`${textSecondaryClass}`}>
                Conoce la ubicación exacta de tus contactos de confianza en cualquier momento con actualizaciones en vivo.
              </p>
            </div>

            {/* Feature 2 */}
            <div className={`${surfaceClass} rounded-xl p-8 hover:shadow-lg transition-all duration-300`}>
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className={`text-xl font-bold mb-3 ${textPrimaryClass}`}>
                Seguridad de Datos
              </h3>
              <p className={`${textSecondaryClass}`}>
                Encriptación de extremo a extremo garantiza que tus datos personales permanezcan protegidos en todo momento.
              </p>
            </div>

            {/* Feature 3 */}
            <div className={`${surfaceClass} rounded-xl p-8 hover:shadow-lg transition-all duration-300`}>
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className={`text-xl font-bold mb-3 ${textPrimaryClass}`}>
                App Móvil Disponible
              </h3>
              <p className={`${textSecondaryClass}`}>
                Descarga nuestra aplicación en iOS y Android para tener control total desde tu teléfono.
              </p>
            </div>

            {/* Feature 4 */}
            <div className={`${surfaceClass} rounded-xl p-8 hover:shadow-lg transition-all duration-300`}>
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className={`text-xl font-bold mb-3 ${textPrimaryClass}`}>
                Contactos de Confianza
              </h3>
              <p className={`${textSecondaryClass}`}>
                Agrega solo a las personas en las que confías y controla quién puede ver tu ubicación.
              </p>
            </div>

            {/* Feature 5 */}
            <div className={`${surfaceClass} rounded-xl p-8 hover:shadow-lg transition-all duration-300`}>
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🗺️</span>
              </div>
              <h3 className={`text-xl font-bold mb-3 ${textPrimaryClass}`}>
                Mapa Interactivo
              </h3>
              <p className={`${textSecondaryClass}`}>
                Visualiza en tiempo real la ubicación de todos tus contactos en un mapa interactivo y detallado.
              </p>
            </div>

            {/* Feature 6 */}
            <div className={`${surfaceClass} rounded-xl p-8 hover:shadow-lg transition-all duration-300`}>
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className={`text-xl font-bold mb-3 ${textPrimaryClass}`}>
                Rendimiento Óptimo
              </h3>
              <p className={`${textSecondaryClass}`}>
                Actualizaciones rápidas y eficientes que no consumirán tu batería ni datos móviles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className={`${isDarkMode ? 'bg-dark-surface border-t border-dark-secondary-surface' : 'bg-light-surface border-t'} py-16 md:py-24`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className={`text-4xl font-bold mb-6 ${textPrimaryClass}`}>
                Acerca de Aurora
              </h2>
              <p className={`text-lg mb-4 ${textSecondaryClass} leading-relaxed`}>
                Aurora nació de la necesidad de mantener seguros a nuestros seres queridos de manera simple y efectiva. Nuestra misión es proporcionar una solución tecnológica confiable que permita a las familias estar conectadas sin comprometer la privacidad.
              </p>
              <p className={`text-lg mb-4 ${textSecondaryClass} leading-relaxed`}>
                Con más de 5 años de experiencia en seguridad digital y localización GPS, hemos desarrollado una plataforma que combina tecnología de punta con una interfaz intuitiva y fácil de usar.
              </p>
              <p className={`text-lg ${textSecondaryClass} leading-relaxed`}>
                Confiadas por más de 100,000 familias en toda Latinoamérica, Aurora es la solución de seguridad líder en la región.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className={`${surfaceClass} rounded-xl p-6 text-center`}>
                <div className="text-3xl font-bold text-primary mb-2">100K+</div>
                <p className={`${textSecondaryClass}`}>Usuarios Activos</p>
              </div>
              <div className={`${surfaceClass} rounded-xl p-6 text-center`}>
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <p className={`${textSecondaryClass}`}>Países</p>
              </div>
              <div className={`${surfaceClass} rounded-xl p-6 text-center`}>
                <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                <p className={`${textSecondaryClass}`}>Disponibilidad</p>
              </div>
              <div className={`${surfaceClass} rounded-xl p-6 text-center`}>
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <p className={`${textSecondaryClass}`}>Soporte</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${textPrimaryClass}`}>
              Nuestros Objetivos
            </h2>
            <p className={`text-lg ${textSecondaryClass} max-w-2xl mx-auto`}>
              En Aurora, nos comprometemos con la seguridad y el bienestar de cada familia
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className={`${surfaceClass} rounded-xl p-8 border-l-4 border-primary hover:shadow-lg transition-all duration-300`}>
              <h3 className={`text-xl font-bold mb-3 ${textPrimaryClass}`}>
                Seguridad Total
              </h3>
              <p className={`${textSecondaryClass}`}>
                Proteger la ubicación y privacidad de tus seres queridos mediante tecnología de encriptación de última generación.
              </p>
            </div>

            <div className={`${surfaceClass} rounded-xl p-8 border-l-4 border-primary hover:shadow-lg transition-all duration-300`}>
              <h3 className={`text-xl font-bold mb-3 ${textPrimaryClass}`}>
                Confianza y Transparencia
              </h3>
              <p className={`${textSecondaryClass}`}>
                Garantizar que cada usuario tenga control total sobre quién puede ver su ubicación y cómo se comparten sus datos.
              </p>
            </div>

            <div className={`${surfaceClass} rounded-xl p-8 border-l-4 border-primary hover:shadow-lg transition-all duration-300`}>
              <h3 className={`text-xl font-bold mb-3 ${textPrimaryClass}`}>
                Innovación Continua
              </h3>
              <p className={`${textSecondaryClass}`}>
                Mejorar constantemente nuestras características y rendimiento para proporcionar la mejor experiencia posible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Aurora Section */}
      <section className={`${isDarkMode ? 'bg-dark-surface border-t border-dark-secondary-surface' : 'bg-light-surface border-t'} py-16 md:py-24`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${textPrimaryClass}`}>
              ¿Por Qué Elegir Aurora?
            </h2>
            <p className={`text-lg ${textSecondaryClass} max-w-2xl mx-auto`}>
              Te ofrecemos más que una simple app de localización
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold">
                  ✓
                </div>
                <div>
                  <h3 className={`text-lg font-bold mb-2 ${textPrimaryClass}`}>
                    Actualizaciones en Tiempo Real
                  </h3>
                  <p className={`${textSecondaryClass}`}>
                    Recibe la ubicación actualizada cada segundo sin consumir datos excesivos.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold">
                  ✓
                </div>
                <div>
                  <h3 className={`text-lg font-bold mb-2 ${textPrimaryClass}`}>
                    Historial de Ubicaciones
                  </h3>
                  <p className={`${textSecondaryClass}`}>
                    Accede al historial completo de movimientos de tus contactos para mayor seguridad.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold">
                  ✓
                </div>
                <div>
                  <h3 className={`text-lg font-bold mb-2 ${textPrimaryClass}`}>
                    Múltiples Dispositivos
                  </h3>
                  <p className={`${textSecondaryClass}`}>
                    Accede desde cualquier dispositivo: teléfono, tablet o computadora.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold">
                  ✓
                </div>
                <div>
                  <h3 className={`text-lg font-bold mb-2 ${textPrimaryClass}`}>
                    Privacidad Garantizada
                  </h3>
                  <p className={`${textSecondaryClass}`}>
                    Encriptación de extremo a extremo asegura que solo tú y tus contactos accedan a los datos.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold">
                  ✓
                </div>
                <div>
                  <h3 className={`text-lg font-bold mb-2 ${textPrimaryClass}`}>
                    Interfaz Intuitiva
                  </h3>
                  <p className={`${textSecondaryClass}`}>
                    Diseño limpio y fácil de usar, perfectamente optimizado para usuarios de todas las edades.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold">
                  ✓
                </div>
                <div>
                  <h3 className={`text-lg font-bold mb-2 ${textPrimaryClass}`}>
                    Soporte 24/7
                  </h3>
                  <p className={`${textSecondaryClass}`}>
                    Nuestro equipo está siempre disponible para ayudarte con cualquier consulta.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-4xl font-bold mb-4 ${textPrimaryClass}`}>
              Descarga la App Móvil - IMPRESCINDIBLE
            </h2>
            <p className={`text-lg ${textSecondaryClass} max-w-2xl mx-auto`}>
              La aplicación móvil de Aurora es imprescindible para una experiencia completa de monitoreo en tiempo real. Sin ella, no podrás compartir tu ubicación ni ver la de tus contactos desde el móvil.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <a
              href="#ios"
              className={`${surfaceClass} rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 group border-2 border-primary`}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🍎</div>
              <h3 className={`text-xl font-bold mb-2 ${textPrimaryClass}`}>
                Descargar para iOS
              </h3>
              <p className={`${textSecondaryClass} text-sm mb-4`}>
                Disponible en App Store
              </p>
              <button className="px-6 py-3 bg-primary hover:bg-opacity-90 text-white rounded-lg font-semibold transition-all w-full">
                Descargar en App Store
              </button>
            </a>

            <a
              href="#android"
              className={`${surfaceClass} rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 group border-2 border-primary`}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🤖</div>
              <h3 className={`text-xl font-bold mb-2 ${textPrimaryClass}`}>
                Descargar para Android
              </h3>
              <p className={`${textSecondaryClass} text-sm mb-4`}>
                Disponible en Google Play
              </p>
              <button className="px-6 py-3 bg-primary hover:bg-opacity-90 text-white rounded-lg font-semibold transition-all w-full">
                Descargar en Google Play
              </button>
            </a>
          </div>

          <div className={`mt-12 p-6 rounded-xl ${isDarkMode ? 'bg-dark-secondary-surface border border-dark-surface' : 'bg-light-secondary-surface border border-primary'}`}>
            <p className={`text-center font-semibold ${textPrimaryClass}`}>
              ⚡ La app móvil es la forma principal de compartir y monitorear ubicaciones en tiempo real
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`${isDarkMode ? 'bg-gradient-to-r from-dark-secondary-surface to-dark-surface border border-dark-secondary-surface' : 'bg-gradient-to-r from-light-secondary-surface to-light-surface border border-primary'} rounded-2xl p-12 text-center`}>
            <h2 className={`text-3xl font-bold mb-4 ${textPrimaryClass}`}>
              ¿Listo para proteger a tu familia?
            </h2>
            <p className={`text-lg mb-8 ${textSecondaryClass} max-w-xl mx-auto`}>
              Únete a miles de familias que ya confían en Aurora para mantenerse seguros.
            </p>
            {!user ? (
              <button
                onClick={onLoginClick}
                className="px-8 py-4 bg-primary hover:bg-opacity-90 text-white font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Comenzar Ahora
              </button>
            ) : (
              <button
                onClick={onDashboardClick}
                className="px-8 py-4 bg-primary hover:bg-opacity-90 text-white font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Acceder al Dashboard
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
