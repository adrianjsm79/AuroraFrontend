import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, MapPin, LogOut, Home } from 'lucide-react';

const Header = ({ sidebarOpen, setSidebarOpen, onLogout, onGoHome }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700 fixed top-0 left-0 right-0 z-40">
      <div className="px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all transform hover:scale-105"
        >
          {sidebarOpen ? <X className="w-6 h-6 text-gray-700 dark:text-gray-300" /> : <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />}
        </button>
        
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AuroraWeb
          </h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={handleGoHome}
            className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/50 rounded-xl transition-all transform hover:scale-105 text-blue-600 dark:text-blue-500"
            title="Ir al Inicio"
          >
            <Home className="w-6 h-6" />
          </button>
          <button
            onClick={onLogout}
            className="p-2 hover:bg-red-50 dark:hover:bg-red-900/50 rounded-xl transition-all transform hover:scale-105 text-red-600 dark:text-red-500"
            title="Cerrar sesión"
          >
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;