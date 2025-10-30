import React from 'react';
import { MapPin, Navigation, Users } from 'lucide-react';

const Sidebar = ({ sidebarOpen, currentView, setCurrentView, setSidebarOpen, user, trustedContacts, locationVisible }) => {
  const menuItems = [
    { id: 'home', label: 'Inicio', icon: MapPin },
    { id: 'map', label: 'Mapa', icon: Navigation },
    { id: 'contacts', label: 'Contactos', icon: Users, badge: trustedContacts.length },
  ];

  const handleMenuClick = (viewId) => {
    setCurrentView(viewId);
    setSidebarOpen(false);
  };

  return (
    <aside
      className={`fixed top-16 left-0 bottom-0 w-72 bg-white shadow-2xl transform transition-transform duration-300 z-30 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="p-6 h-full overflow-y-auto">
        <div className="mb-8 pb-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">
                {user?.nombre?.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-bold text-gray-800 text-lg">{user?.nombre}</p>
              <p className="text-sm text-gray-600">{user?.email}</p>
              <p className="text-xs text-gray-500 mt-1">{user?.numero}</p>
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
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-semibold">{item.label}</span>
                {item.badge > 0 && (
                  <span className={`ml-auto px-2 py-1 rounded-full text-xs font-bold ${
                    isActive ? 'bg-white text-indigo-600' : 'bg-indigo-100 text-indigo-600'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4">
            <p className="text-xs text-gray-600 mb-2">Estado de ubicación</p>
            <div className="flex items-center justify-between">
              <span className={`text-sm font-semibold ${locationVisible ? 'text-green-600' : 'text-gray-600'}`}>
                {locationVisible ? 'Visible' : 'Oculta'}
              </span>
              <div className={`w-3 h-3 rounded-full ${locationVisible ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;