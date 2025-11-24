import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

const Navbar = ({ onLoginClick, onDashboardClick }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowMenu(false);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setShowMenu(false);
  };

  const bgClass = isDarkMode
    ? 'bg-dark-surface border-b border-dark-secondary-surface'
    : 'bg-light-surface border-b border-light-secondary-surface shadow-sm';

  const textPrimaryClass = isDarkMode ? 'text-dark-text-primary' : 'text-light-text-primary';
  const textSecondaryClass = isDarkMode ? 'text-dark-text-secondary' : 'text-light-text-secondary';

  return (
    <nav className={`${bgClass} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className={`font-bold text-xl ${textPrimaryClass}`}>Aurora</span>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => navigate('/')}
              className={`${textPrimaryClass} hover:text-primary transition-colors duration-200 font-medium`}
            >
              Inicio
            </button>

            {user && (
              <>
                <button
                  onClick={() => navigate('/dashboard')}
                  className={`${textPrimaryClass} hover:text-primary transition-colors duration-200 font-medium`}
                >
                  Dashboard
                </button>
                <div className="flex items-center space-x-4 pl-4 border-l border-gray-300 dark:border-dark-secondary-surface">
                  <span className={`${textSecondaryClass} text-sm`}>
                    {user.nombre || 'Usuario'}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-primary hover:bg-opacity-90 text-white rounded-lg font-medium transition-all duration-200"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </>
            )}

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${isDarkMode ? 'bg-dark-secondary-surface' : 'bg-light-secondary-surface'}`}
              title="Cambiar tema"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${isDarkMode ? 'bg-dark-secondary-surface' : 'bg-light-secondary-surface'}`}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className={`p-2 rounded-lg ${isDarkMode ? 'bg-dark-secondary-surface' : 'bg-light-secondary-surface'}`}
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMenu && (
          <div className={`md:hidden pb-4 space-y-3 ${isDarkMode ? 'border-t border-dark-secondary-surface' : 'border-t'}`}>
            <button
              onClick={() => handleNavigate('/')}
              className={`block w-full text-left px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-colors ${textPrimaryClass}`}
            >
              Inicio
            </button>

            {user && (
              <>
                <button
                  onClick={() => handleNavigate('/dashboard')}
                  className={`block w-full text-left px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-colors ${textPrimaryClass}`}
                >
                  Dashboard
                </button>
                <div className={`px-4 py-2 ${textSecondaryClass}`}>
                  {user.nombre || 'Usuario'}
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 bg-primary hover:bg-opacity-90 text-white rounded-lg font-medium transition-all"
                >
                  Cerrar sesión
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
