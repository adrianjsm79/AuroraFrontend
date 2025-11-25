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
              Aurora: Localización en tiempo real de dispositivos, seguimiento de personas y protección contra delincuencia. Recupera tus dispositivos perdidos o robados al instante.
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
              Protección integral para tus dispositivos, seres queridos y prevención ante delincuencia
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
                Ubica tus dispositivos en segundos. Rastreo GPS preciso de teléfonos, tablets y otros dispositivos con actualizaciones cada segundo.
              </p>
            </div>

            {/* Feature 2 */}
            <div className={`${surfaceClass} rounded-xl p-8 hover:shadow-lg transition-all duration-300`}>
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className={`text-xl font-bold mb-3 ${textPrimaryClass}`}>
                Recupera Dispositivos Robados
              </h3>
              <p className={`${textSecondaryClass}`}>
                Si tu dispositivo es robado, localízalo al instante. Bloquea acceso remoto y protege tus datos antes de que sea demasiado tarde.
              </p>
            </div>

            {/* Feature 3 */}
            <div className={`${surfaceClass} rounded-xl p-8 hover:shadow-lg transition-all duration-300`}>
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className={`text-xl font-bold mb-3 ${textPrimaryClass}`}>
                App Móvil Indispensable
              </h3>
              <p className={`${textSecondaryClass}`}>
                La aplicación móvil es esencial. Comparte tu ubicación en tiempo real y monitorea dispositivos desde cualquier lugar.
              </p>
            </div>

            {/* Feature 4 */}
            <div className={`${surfaceClass} rounded-xl p-8 hover:shadow-lg transition-all duration-300`}>
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className={`text-xl font-bold mb-3 ${textPrimaryClass}`}>
                Monitoreo de Contactos
              </h3>
              <p className={`${textSecondaryClass}`}>
                Mantén a tu familia segura. Sabe dónde están tus seres queridos en tiempo real y recibe alertas de ubicación sospechosa.
              </p>
            </div>

            {/* Feature 5 */}
            <div className={`${surfaceClass} rounded-xl p-8 hover:shadow-lg transition-all duration-300`}>
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className={`text-xl font-bold mb-3 ${textPrimaryClass}`}>
                Protección Ante Delincuencia
              </h3>
              <p className={`${textSecondaryClass}`}>
                Aurora te ayuda a actuar rápido ante robos. Comparte información con autoridades y obtén apoyo inmediato de nuestra comunidad.
              </p>
            </div>

            {/* Feature 6 */}
            <div className={`${surfaceClass} rounded-xl p-8 hover:shadow-lg transition-all duration-300`}>
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🗺️</span>
              </div>
              <h3 className={`text-xl font-bold mb-3 ${textPrimaryClass}`}>
                Mapa Interactivo 24/7
              </h3>
              <p className={`${textSecondaryClass}`}>
                Visualiza todos tus dispositivos y contactos en un mapa. Disponible 24/7 desde cualquier navegador con seguridad total.
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
                Aurora nació con un propósito claro: luchar contra la delincuencia tecnológica y proteger lo que más importa. Nos especializamos en localización de dispositivos perdidos, robados y en seguimiento de personas para su seguridad.
              </p>
              <p className={`text-lg mb-4 ${textSecondaryClass} leading-relaxed`}>
                En una era donde los robos aumentan constantemente, Aurora te ofrece una herramienta poderosa para recuperar tus dispositivos al instante y mantener a tu familia segura. Nuestro sistema es respaldado por encriptación de nivel militar.
              </p>
              <p className={`text-lg ${textSecondaryClass} leading-relaxed`}>
                Con más de 5 años de experiencia en tecnología de seguridad y localización GPS, hemos ayudado a miles de usuarios a recuperar dispositivos robados y mantener protegida a su familia.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className={`${surfaceClass} rounded-xl p-6 text-center`}>
                <div className="text-3xl font-bold text-primary mb-2">100K+</div>
                <p className={`${textSecondaryClass}`}>Usuarios Activos</p>
              </div>
              <div className={`${surfaceClass} rounded-xl p-6 text-center`}>
                <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                <p className={`${textSecondaryClass}`}>Dispositivos Recuperados</p>
              </div>
              <div className={`${surfaceClass} rounded-xl p-6 text-center`}>
                <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                <p className={`${textSecondaryClass}`}>Disponibilidad</p>
              </div>
              <div className={`${surfaceClass} rounded-xl p-6 text-center`}>
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <p className={`${textSecondaryClass}`}>Soporte Activo</p>
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
              En Aurora, nos comprometemos con la lucha contra la delincuencia y la protección de lo que más importa
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className={`${surfaceClass} rounded-xl p-8 border-l-4 border-primary hover:shadow-lg transition-all duration-300`}>
              <h3 className={`text-xl font-bold mb-3 ${textPrimaryClass}`}>
                Recuperación de Dispositivos
              </h3>
              <p className={`${textSecondaryClass}`}>
                Ayudar a usuarios a recuperar sus dispositivos robados o perdidos en el menor tiempo posible. Somos tu aliado contra la delincuencia tecnológica.
              </p>
            </div>

            <div className={`${surfaceClass} rounded-xl p-8 border-l-4 border-primary hover:shadow-lg transition-all duration-300`}>
              <h3 className={`text-xl font-bold mb-3 ${textPrimaryClass}`}>
                Protección Familiar
              </h3>
              <p className={`${textSecondaryClass}`}>
                Proporcionar tranquilidad a las familias permitiéndoles saber en tiempo real dónde están sus seres queridos. Seguridad sin comprometer la privacidad.
              </p>
            </div>

            <div className={`${surfaceClass} rounded-xl p-8 border-l-4 border-primary hover:shadow-lg transition-all duration-300`}>
              <h3 className={`text-xl font-bold mb-3 ${textPrimaryClass}`}>
                Innovación Continua
              </h3>
              <p className={`${textSecondaryClass}`}>
                Mejorar constantemente nuestras características para mantenernos un paso adelante de la delincuencia y brindar la mejor protección posible.
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
              Somos la solución número uno para localización de dispositivos y protección ante delincuencia
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
                    Recuperación Inmediata
                  </h3>
                  <p className={`${textSecondaryClass}`}>
                    Localiza tu dispositivo robado al instante. Tiempo es crítico en delincuencia.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold">
                  ✓
                </div>
                <div>
                  <h3 className={`text-lg font-bold mb-2 ${textPrimaryClass}`}>
                    Precisión GPS Exacta
                  </h3>
                  <p className={`${textSecondaryClass}`}>
                    Localización precisa hasta metros. Útil para recuperar o reportar a autoridades.
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
                    Monitorea todos tus dispositivos desde un único panel. Teléfonos, tablets, laptops.
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
                    Encriptación Militar
                  </h3>
                  <p className={`${textSecondaryClass}`}>
                    Tus datos están protegidos con el estándar más alto de seguridad disponible.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold">
                  ✓
                </div>
                <div>
                  <h3 className={`text-lg font-bold mb-2 ${textPrimaryClass}`}>
                    100% Gratuito
                  </h3>
                  <p className={`${textSecondaryClass}`}>
                    Acceso completo sin costo. No hay suscripciones ocultas o publicidades intrusivas.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0 text-white font-bold">
                  ✓
                </div>
                <div>
                  <h3 className={`text-lg font-bold mb-2 ${textPrimaryClass}`}>
                    Comunidad Activa
                  </h3>
                  <p className={`${textSecondaryClass}`}>
                    Parte de una comunidad que lucha contra la delincuencia. Reporta, alerta y ayuda.
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

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* iOS */}
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
              <button disabled className="px-6 py-3 bg-gray-400 text-white rounded-lg font-semibold transition-all w-full opacity-75 cursor-not-allowed">
                ⏳ Próximamente
              </button>
            </a>

            {/* Android */}
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

            {/* QR y GitHub */}
            <div className={`${surfaceClass} rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 border-2 border-primary`}>
              <div className="mb-4 flex justify-center">
                <img 
                  src="/images/qrAuroraReleases.png" 
                  alt="QR Aurora Releases" 
                  className="w-48 h-48 rounded-lg shadow-lg"
                />
              </div>
              <h3 className={`text-xl font-bold mb-2 ${textPrimaryClass}`}>
                Escanea el QR
              </h3>
              <p className={`${textSecondaryClass} text-sm mb-4`}>
                O descarga desde nuestro repositorio
              </p>
              <a
                href="https://github.com/adrianjsm79/aurora-mobile/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary hover:bg-opacity-90 text-white rounded-lg font-semibold transition-all w-full"
              >
                <span className="mr-2">📦</span>
                Ver en GitHub
              </a>
              <p className={`${textSecondaryClass} text-xs mt-3`}>
                Últimas versiones disponibles
              </p>
            </div>
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
              ¿Tu dispositivo fue robado o perdido?
            </h2>
            <p className={`text-lg mb-8 ${textSecondaryClass} max-w-xl mx-auto`}>
              No esperes más. Aurora te ayuda a localizarlo al instante. Únete a miles de usuarios que ya han recuperado sus dispositivos exitosamente.
            </p>
            {!user ? (
              <button
                onClick={onLoginClick}
                className="px-8 py-4 bg-primary hover:bg-opacity-90 text-white font-bold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Comienza Ahora - Es Gratis
              </button>
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
      </section>
    </div>
  );
};

export default HomePage;
