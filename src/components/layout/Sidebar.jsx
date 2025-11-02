import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Users, Info, Sun, Moon } from 'lucide-react';

const Sidebar = ({ sidebarOpen, currentView, setCurrentView, setSidebarOpen, user, trustedContacts, locationVisible }) => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const menuItems = [
    { id: 'home', label: 'Inicio', icon: MapPin },
    { id: 'map', label: 'Mapa', icon: Navigation },
    { id: 'contacts', label: 'Contactos', icon: Users, badge: trustedContacts.length },
    { id: 'about', label: 'Sobre Nosotros', icon: Info },
  ];

  const handleMenuClick = (viewId) => {
    setCurrentView(viewId);
    setSidebarOpen(false);
  };

  return (
    <aside
      className={`fixed top-16 left-0 bottom-0 w-72 bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 z-30 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="p-6 h-full overflow-y-auto">
        <div className="mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">
                {user?.nombre?.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-bold text-gray-800 dark:text-gray-200 text-lg">{user?.nombre}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{user?.email}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{user?.numero}</p>
            </div>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all transform hover:scale-105 ${
                  isActive
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-semibold">{item.label}</span>
                {item.badge > 0 && (
                  <span className={`ml-auto px-2 py-1 rounded-full text-xs font-bold ${
                    isActive ? 'bg-white text-indigo-600' : 'bg-indigo-100 text-indigo-600 dark:bg-gray-700 dark:text-indigo-300'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Modo Oscuro
              </span>
              <button
                onClick={handleThemeSwitch}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;