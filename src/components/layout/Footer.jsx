import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const Footer = () => {
  const { isDarkMode } = useTheme();
  const currentYear = new Date().getFullYear();

  const bgClass = isDarkMode ? 'bg-dark-surface border-t border-dark-secondary-surface' : 'bg-light-secondary-surface border-t';
  const textPrimaryClass = isDarkMode ? 'text-dark-text-primary' : 'text-light-text-primary';
  const textSecondaryClass = isDarkMode ? 'text-dark-text-secondary' : 'text-light-text-secondary';
  const linkClass = isDarkMode ? 'text-primary hover:text-opacity-80' : 'text-primary hover:text-opacity-90';

  return (
    <footer className={`${bgClass} mt-auto transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className={`font-bold text-lg ${textPrimaryClass}`}>Aurora</span>
            </div>
            <p className={`text-sm ${textSecondaryClass} leading-relaxed`}>
              Aplicación de seguridad en tiempo real para mantener a tus seres queridos protegidos.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4 mt-4">
              <a href="https://github.com/adrianjsm79" target="_blank" rel="noopener noreferrer" 
                className={`${linkClass} hover:scale-110 transition-transform text-2xl`} title="GitHub">
                🐙
              </a>
              <a href="#facebook" 
                className={`${linkClass} hover:scale-110 transition-transform text-2xl`} title="Facebook">
                📘
              </a>
              <a href="#twitter" 
                className={`${linkClass} hover:scale-110 transition-transform text-2xl`} title="Twitter">
                𝕏
              </a>
              <a href="#instagram" 
                className={`${linkClass} hover:scale-110 transition-transform text-2xl`} title="Instagram">
                📷
              </a>
              <a href="#linkedin" 
                className={`${linkClass} hover:scale-110 transition-transform text-2xl`} title="LinkedIn">
                💼
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className={`font-semibold mb-4 ${textPrimaryClass}`}>📱 Producto</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className={`text-sm ${linkClass} transition-colors`}>
                  Características
                </a>
              </li>
              <li>
                <a href="#security" className={`text-sm ${linkClass} transition-colors`}>
                  Seguridad
                </a>
              </li>
              <li>
                <a href="#download" className={`text-sm ${linkClass} transition-colors`}>
                  Descargar App
                </a>
              </li>
              <li>
                <a href="#changelog" className={`text-sm ${linkClass} transition-colors`}>
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className={`font-semibold mb-4 ${textPrimaryClass}`}>🏢 Empresa</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className={`text-sm ${linkClass} transition-colors`}>
                  Acerca de
                </a>
              </li>
              <li>
                <a href="https://github.com/adrianjsm79/AuroraBackend" target="_blank" rel="noopener noreferrer" className={`text-sm ${linkClass} transition-colors`}>
                  GitHub Backend
                </a>
              </li>
              <li>
                <a href="https://github.com/adrianjsm79/aurorafrontend" target="_blank" rel="noopener noreferrer" className={`text-sm ${linkClass} transition-colors`}>
                  GitHub Frontend
                </a>
              </li>
              <li>
                <a href="#contact" className={`text-sm ${linkClass} transition-colors`}>
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className={`font-semibold mb-4 ${textPrimaryClass}`}>💬 Soporte</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:support@aurorasecurity.com" className={`text-sm ${linkClass} transition-colors`}>
                  ✉️ Soporte
                </a>
              </li>
              <li>
                <a href="mailto:dev@aurorasecurity.com" className={`text-sm ${linkClass} transition-colors`}>
                  👨‍💻 Desarrolladores
                </a>
              </li>
              <li>
                <a href="#faq" className={`text-sm ${linkClass} transition-colors`}>
                  ❓ FAQ
                </a>
              </li>
              <li>
                <a href="#status" className={`text-sm ${linkClass} transition-colors`}>
                  📊 Estado
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className={`font-semibold mb-4 ${textPrimaryClass}`}>⚖️ Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#privacy" className={`text-sm ${linkClass} transition-colors`}>
                  Privacidad
                </a>
              </li>
              <li>
                <a href="#terms" className={`text-sm ${linkClass} transition-colors`}>
                  Términos
                </a>
              </li>
              <li>
                <a href="#cookies" className={`text-sm ${linkClass} transition-colors`}>
                  Cookies
                </a>
              </li>
              <li>
                <a href="#compliance" className={`text-sm ${linkClass} transition-colors`}>
                  Cumplimiento
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Team Section */}
        <div className={`mb-8 p-6 rounded-lg ${isDarkMode ? 'bg-dark-secondary-surface border border-dark-surface' : 'bg-light-surface border border-primary'}`}>
          <h3 className={`font-semibold mb-3 ${textPrimaryClass} flex items-center`}>
            <span className="mr-2">👥</span> Equipo de Desarrollo
          </h3>
          <p className={`text-sm ${textSecondaryClass} mb-3`}>
            Aurora es un proyecto de código abierto desarrollado con pasión. Conoce al equipo:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <a href="https://github.com/adrianjsm79" target="_blank" rel="noopener noreferrer"
              className={`text-sm ${linkClass} transition-colors hover:underline`}>
              • Adrián Silva - Lead Developer & Founder
            </a>
            <a href="mailto:dev@aurorasecurity.com"
              className={`text-sm ${linkClass} transition-colors hover:underline`}>
              • Contactar al Equipo de Desarrollo
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className={`border-t ${isDarkMode ? 'border-dark-secondary-surface' : 'border-gray-200'} mb-6`}></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <p className={`text-sm ${textSecondaryClass}`}>
            &copy; {currentYear} Aurora Security. Todos los derechos reservados. • 100% Gratuito • Open Source
          </p>

          {/* Version & Status */}
          <div className="flex items-center space-x-4">
            <span className={`text-xs ${textSecondaryClass}`}>
              v1.0.0
            </span>
            <span className="text-xs text-green-500">
              ● Status: Operativo
            </span>
          </div>
        </div>

        {/* Footer Note */}
        <div className={`text-xs ${textSecondaryClass} text-center mt-6 opacity-75`}>
          Desarrollado con ❤️ • Aurora Web Platform • 
          <a href="https://github.com/adrianjsm79" target="_blank" rel="noopener noreferrer" className={`ml-1 ${linkClass}`}>
            Ver en GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
