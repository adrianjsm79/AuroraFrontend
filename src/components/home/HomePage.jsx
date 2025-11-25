import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LockIcon from '@mui/icons-material/Lock';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import WarningIcon from '@mui/icons-material/Warning';
import MapIcon from '@mui/icons-material/Map';
import Footer from "../layout/Footer";

const HomePage = ({ onLoginClick, onDashboardClick }) => {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();

  const textPrimaryClass = isDarkMode ? 'text-white' : 'text-gray-900';
  const textSecondaryClass = isDarkMode ? 'text-slate-300' : 'text-gray-700';
  const surfaceClass = isDarkMode
    ? 'bg-white/6 backdrop-blur-sm border border-white/10'
    : 'bg-white/80 border border-gray-200 shadow-sm';

  const ImprovedHero = () => {
    return (
      <section className="relative min-h-[65vh] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        <div className="absolute top-16 left-8 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-16 right-8 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full mb-6 border border-white/20">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-sm text-white/90">100K+ usuarios protegidos</span>
          </div>

          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-50" />
              <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl transform rotate-6 hover:rotate-0 transition-transform">
                <span className="text-white font-bold text-4xl">A</span>
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-4 text-white">
            Nunca más
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent bg-[length:300%] animate-[gradient_8s_linear_infinite]">
              pierdas nada
            </span>
          </h1>

          <p className="text-lg md:text-xl mb-8 max-w-2xl text-slate-300 leading-relaxed">
            Localiza tus dispositivos al instante, mantén a tu familia segura y recupera lo robado.
            <span className="text-white font-semibold"> Todo en tiempo real.</span>
          </p>

          <div className="flex gap-3">
            {!user ? (
              <>
                <button
                  onClick={onLoginClick}
                  className="px-6 py-3 bg-primary text-white rounded-md font-bold shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
                >
                  Crear Cuenta
                </button>
                <button
                  onClick={onLoginClick}
                  className="px-4 py-3 bg-white/10 text-white rounded-md font-semibold border border-white/20 hover:bg-white/20 transition"
                >
                  Iniciar sesión
                </button>
              </>
            ) : (
              <button
                onClick={onDashboardClick}
                className="px-6 py-3 bg-primary text-white rounded-md font-bold shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
              >
                Ir al Dashboard
              </button>
            )}
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="transition-colors duration-300 flex flex-col">
      <ImprovedHero />

      {/* FEATURES SECTION */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${textPrimaryClass}`}>Características Principales</h2>
            <p className={`text-lg ${textSecondaryClass} max-w-2xl mx-auto`}>
              Protección integral para tus dispositivos y seres queridos
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <LocationOnIcon sx={{ fontSize: 30 }} />, title: "Localización en Tiempo Real", text: "Rastreo GPS preciso con actualizaciones cada segundo." },
              { icon: <LockIcon sx={{ fontSize: 30 }} />, title: "Recupera Dispositivos Robados", text: "Bloqueo remoto y localización inmediata ante robos." },
              { icon: <SmartphoneIcon sx={{ fontSize: 30 }} />, title: "App Móvil Indispensable", text: "Comparte y monitorea ubicación desde cualquier lugar." },
              { icon: <ConnectWithoutContactIcon sx={{ fontSize: 30 }} />, title: "Monitoreo de Contactos", text: "Mantén segura a tu familia con alertas en tiempo real." },
              { icon: <WarningIcon sx={{ fontSize: 30 }} />, title: "Protección Ante Delincuencia", text: "Actúa rápido y comparte datos con autoridades." },
              { icon: <MapIcon sx={{ fontSize: 30 }} />, title: "Mapa Interactivo 24/7", text: "Visualiza todos tus dispositivos y contactos en un mapa." }
            ].map((f, i) => (
              <div key={i} className={`${surfaceClass} rounded-xl p-8 hover:shadow-lg transition-all`}>
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center mb-4 text-2xl">
                  {f.icon}
                </div>
                <h3 className={`text-xl font-bold mb-3 ${textPrimaryClass}`}>{f.title}</h3>
                <p className={textSecondaryClass}>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className={`${isDarkMode ? 'bg-dark-surface border-t border-dark-secondary-surface' : 'bg-light-surface border-t'} py-16 md:py-24`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className={`text-4xl font-bold mb-6 ${textPrimaryClass}`}>Acerca de Aurora</h2>
            <p className={`text-lg mb-4 ${textSecondaryClass}`}>Aurora nació con un propósito: combatir la delincuencia tecnológica.</p>
            <p className={`text-lg mb-4 ${textSecondaryClass}`}>Protección con encriptación militar y tecnología GPS avanzada.</p>
            <p className={`text-lg ${textSecondaryClass}`}>5 años de experiencia ayudando a recuperar miles de dispositivos.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              ["100K+", "Usuarios Activos"],
              ["10K+", "Dispositivos Recuperados"],
              ["99.9%", "Disponibilidad"],
              ["24/7", "Soporte Activo"]
            ].map(([num, label], i) => (
              <div key={i} className={`${surfaceClass} rounded-xl p-6 text-center`}>
                <div className="text-3xl font-bold text-primary mb-2">{num}</div>
                <p className={textSecondaryClass}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OBJECTIVES */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${textPrimaryClass}`}>Nuestros Objetivos</h2>
            <p className={`text-lg ${textSecondaryClass} max-w-2xl mx-auto`}>Compromiso total con tu seguridad</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              ["Recuperación de Dispositivos", "Recupera teléfonos perdidos o robados rápidamente."],
              ["Protección Familiar", "Ubicación en tiempo real para tu familia sin perder privacidad."],
              ["Innovación Continua", "Actualizaciones constantes para combatir la delincuencia."]
            ].map(([title, text], i) => (
              <div key={i} className={`${surfaceClass} rounded-xl p-8 border-l-4 border-primary hover:shadow-lg`}>
                <h3 className={`text-xl font-bold mb-3 ${textPrimaryClass}`}>{title}</h3>
                <p className={textSecondaryClass}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY AURORA */}
      <section className={`${isDarkMode ? 'bg-dark-surface border-t border-dark-secondary-surface' : 'bg-light-surface border-t'} py-16 md:py-24`} >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${textPrimaryClass}`}>¿Por Qué Elegir Aurora?</h2>
            <p className={`text-lg ${textSecondaryClass} max-w-2xl mx-auto`}> La plataforma más completa en seguridad y localización </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              {[
                ["Recuperación Inmediata", "Localiza tu dispositivo al instante."],
                ["Precisión GPS Exacta", "Ubicación precisa hasta metros."],
                ["Múltiples Dispositivos", "Administra varios equipos desde un solo panel."]
              ].map(([title, text], i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold">✓</div>
                  <div>
                    <h3 className={`text-lg font-bold mb-2 ${textPrimaryClass}`}>{title}</h3>
                    <p className={textSecondaryClass}>{text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-6">
              {[
                ["Encriptación Militar", "Protege tus datos con el estándar más alto."],
                ["100% Gratuito", "Sin suscripciones ni anuncios."],
                ["Comunidad Activa", "Reporta y recibe ayuda de otros usuarios."]
              ].map(([title, text], i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold">✓</div>
                  <div>
                    <h3 className={`text-lg font-bold mb-2 ${textPrimaryClass}`}>{title}</h3>
                    <p className={textSecondaryClass}>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE APP SECTION */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className={`text-4xl font-bold mb-4 ${textPrimaryClass}`}>Descarga la App Móvil</h2>
            <p className={`text-lg ${textSecondaryClass} max-w-2xl mx-auto`}>
              La app móvil es imprescindible para compartir tu ubicación en tiempo real
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
            {/* iOS - tarjeta agrandada */}
            <div className={`${surfaceClass} rounded-2xl p-10 text-center border-2 border-primary flex flex-col items-center justify-between min-h-[26rem]`}>
              <div className="mb-6 flex items-center justify-center h-48">
                <AppleIcon sx={{ fontSize: 96 }} className={isDarkMode ? 'text-dark-text-primary' : 'text-light-text-primary'} />
              </div>
              <div>
                <h3 className={`text-2xl font-bold mb-3 ${textPrimaryClass}`}>iOS</h3>
                <p className={textSecondaryClass}>Próximamente</p>
              </div>
              <button disabled className="px-6 py-3 bg-gray-400 text-white rounded-lg mt-6 w-full cursor-not-allowed">
                ⏳ En desarrollo
              </button>
            </div>

            {/* Android - tarjeta agrandada y icono centrado */}
            <a href="#android" className={`${surfaceClass} rounded-2xl p-10 text-center hover:shadow-lg border-2 border-primary flex flex-col items-center justify-between min-h-[26rem]`} >
              <div className="mb-6 flex items-center justify-center h-48">
                <AndroidIcon sx={{ fontSize: 96 }} className="text-green-500" />
              </div>
              <div>
                <h3 className={`text-2xl font-bold mb-3 ${textPrimaryClass}`}>Android</h3>
                <p className={textSecondaryClass}>Disponible en Google Play</p>
              </div>
              <button className="px-6 py-3 bg-primary text-white rounded-lg w-full mt-6">
                Descargar
              </button>
            </a>

            {/* QR / GitHub - mantener grande para igualar altura */}
            <div className={`${surfaceClass} rounded-2xl p-10 text-center border-2 border-primary flex flex-col items-center justify-between min-h-[26rem]`}>
              <div className="mb-6 flex justify-center items-center h-48">
                <img src="https://placehold.co/224x224/1f2937/FFFFFF?text=QR" alt="QR Placeholder" className="w-56 h-56 mx-auto mb-4 rounded-lg shadow-lg" />
              </div>
              <div>
                <h3 className={`text-2xl font-bold mb-2 ${textPrimaryClass}`}>Escanea el QR</h3>
                <p className={textSecondaryClass}>Descarga desde GitHub</p>
              </div>
              <a
                href="https://github.com/adrianjsm79/aurora-mobile/releases"
                target="_blank"
                className="px-6 py-3 bg-primary text-white rounded-lg w-full inline-block mt-6"
              >
                📦 Ver Repositorio
              </a>
            </div>
          </div>

          <div className={`mt-8 md:mt-10 p-8 md:p-10 rounded-2xl text-center font-semibold text-lg shadow-2xl ${isDarkMode ? 'bg-dark-secondary-surface border-2 border-dark-surface' : 'bg-white/95 border-2 border-primary'}`}>
            ⚡ La app móvil es necesaria para monitorear en tiempo real
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-12 md:py-16 -mt-4 md:-mt-6">
         <div className="max-w-4xl mx-auto px-4">
          <div className={`${isDarkMode ? 'bg-gradient-to-r from-dark-secondary-surface to-dark-surface border border-dark-secondary-surface' : 'bg-gradient-to-r from-light-secondary-surface to-light-surface border border-primary'} rounded-2xl p-10 text-center shadow-xl`}>
             <h2 className={`text-4xl font-bold mb-6 ${textPrimaryClass}`}> ¿Listo para comenzar? </h2>
             <p className={`text-lg mb-8 ${textSecondaryClass}`}>
               Únete a miles de usuarios que ya protegen sus dispositivos y a su familia con Aurora.
             </p>
             {!user ? (
               <button
                 onClick={onLoginClick}
                 className="px-10 py-4 bg-primary text-white font-bold rounded-xl hover:bg-opacity-90 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
               >
                 Crear Cuenta Gratis
               </button>
             ) : (
               <button
                 onClick={onDashboardClick}
                 className="px-10 py-4 bg-primary text-white font-bold rounded-xl hover:bg-opacity-90 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
               >
                 Ir al Dashboard
               </button>
             )}
           </div>
         </div>
       </section>

      <Footer />
    </div>
  );
};

export default HomePage;