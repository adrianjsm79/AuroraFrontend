import React from 'react';
import { MapPin, Navigation, Users, Smartphone, Info, Sun, Moon, Settings, LogOut, ChevronRight } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Sidebar = ({ sidebarOpen, currentView, setCurrentView, setSidebarOpen, user, trustedContacts, locationVisible }) => {
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { id: 'homeview', label: 'Inicio', icon: MapPin, color: 'indigo' },
    { id: 'map', label: 'Mapa en Vivo', icon: Navigation, color: 'blue' },
    { id: 'devices', label: 'Dispositivos', icon: Smartphone, color: 'purple' },
    { id: 'contacts', label: 'Contactos', icon: Users, color: 'pink', badge: trustedContacts.length },
    { id: 'account', label: 'Mi Cuenta', icon: Settings, color: 'orange' },
  ];

  const handleMenuClick = (viewId) => {
    setCurrentView(viewId);
    setSidebarOpen(false);
  };

  return (
    <aside
      className={`fixed top-16 left-0 bottom-0 w-72 bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 z-30 flex flex-col ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Perfil del Usuario */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">
                {user?.nombre?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-800 dark:text-gray-100 text-sm truncate">{user?.nombre}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
            <div className="flex items-center space-x-1 mt-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-xs text-green-600 dark:text-green-400 font-semibold">Activo</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menú Principal */}
      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            const colorClasses = {
              indigo: 'from-indigo-500 to-indigo-600',
              blue: 'from-blue-500 to-blue-600',
              purple: 'from-purple-500 to-purple-600',
              pink: 'from-pink-500 to-pink-600',
              orange: 'from-orange-500 to-orange-600',
            };

            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                  isActive
                    ? `bg-gradient-to-r ${colorClasses[item.color]} text-white shadow-lg scale-105`
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
              >
                {/* Fondo animado en hover */}
                {!isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-full group-hover:translate-x-full"></div>
                )}
                
                <div className={`p-2 rounded-lg transition-all ${
                  isActive
                    ? 'bg-white/20'
                    : 'bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                
                <div className="flex-1 text-left">
                  <span className="font-semibold text-sm">{item.label}</span>
                </div>

                {item.badge > 0 && (
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${
                    isActive 
                      ? 'bg-white/30 text-white' 
                      : 'bg-pink-100 text-pink-600 dark:bg-pink-900/40 dark:text-pink-300'
                  }`}>
                    {item.badge}
                  </span>
                )}

                {isActive && (
                  <ChevronRight className="w-5 h-5 opacity-70" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Pie del Sidebar */}
      <div className="border-t border-gray-100 dark:border-gray-800 p-4 space-y-3">
        {/* Toggle Tema */}
        <button
          onClick={toggleTheme}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 text-gray-700 dark:text-gray-300"
        >
          <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
            {theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </div>
          <span className="font-semibold text-sm flex-1 text-left">
            {theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
          </span>
          <div className={`w-11 h-6 rounded-full transition-all ${
            theme === 'dark' ? 'bg-indigo-600' : 'bg-gray-300'
          } flex items-center p-1`}>
            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
              theme === 'dark' ? 'translate-x-5' : 'translate-x-0'
            }`}></div>
          </div>
        </button>

        {/* Información y Ayuda */}
        <button
          onClick={() => {
            setCurrentView('about');
            setSidebarOpen(false);
          }}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 text-gray-700 dark:text-gray-300"
        >
          <div className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
            <Info className="w-5 h-5" />
          </div>
          <span className="font-semibold text-sm flex-1 text-left">Información</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
