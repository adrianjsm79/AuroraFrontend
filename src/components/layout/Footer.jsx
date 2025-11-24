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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
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
          </div>

          {/* Product */}
          <div>
            <h3 className={`font-semibold mb-4 ${textPrimaryClass}`}>Producto</h3>
            <ul className="space-y-2">
              <li>
                <a href="#features" className={`text-sm ${linkClass} transition-colors`}>
                  Características
                </a>
              </li>
              <li>
                <a href="#pricing" className={`text-sm ${linkClass} transition-colors`}>
                  Precios
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
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className={`font-semibold mb-4 ${textPrimaryClass}`}>Empresa</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className={`text-sm ${linkClass} transition-colors`}>
                  Acerca de
                </a>
              </li>
              <li>
                <a href="#blog" className={`text-sm ${linkClass} transition-colors`}>
                  Blog
                </a>
              </li>
              <li>
                <a href="#careers" className={`text-sm ${linkClass} transition-colors`}>
                  Empleos
                </a>
              </li>
              <li>
                <a href="#contact" className={`text-sm ${linkClass} transition-colors`}>
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className={`font-semibold mb-4 ${textPrimaryClass}`}>Legal</h3>
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

        {/* Divider */}
        <div className={`border-t ${isDarkMode ? 'border-dark-secondary-surface' : 'border-gray-200'} mb-6`}></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <p className={`text-sm ${textSecondaryClass}`}>
            &copy; {currentYear} Aurora Security. Todos los derechos reservados.
          </p>

          {/* Social Links */}
          <div className="flex space-x-6">
            <a href="#facebook" className={`text-sm ${linkClass} hover:scale-110 transition-transform`}>
              Facebook
            </a>
            <a href="#twitter" className={`text-sm ${linkClass} hover:scale-110 transition-transform`}>
              Twitter
            </a>
            <a href="#instagram" className={`text-sm ${linkClass} hover:scale-110 transition-transform`}>
              Instagram
            </a>
            <a href="#linkedin" className={`text-sm ${linkClass} hover:scale-110 transition-transform`}>
              LinkedIn
            </a>
          </div>
        </div>

        {/* Version */}
        <div className={`text-xs ${textSecondaryClass} text-center mt-6 opacity-75`}>
          Versión 1.0.0 | Aurora Web Platform
        </div>
      </div>
    </footer>
  );
};

export default Footer;
