import React from 'react';
import { Menu, X, MapPin, LogOut } from 'lucide-react';

const Header = ({ sidebarOpen, setSidebarOpen, onLogout }) => {
  return (
    <header className="bg-white shadow-md border-b border-gray-200 fixed top-0 left-0 right-0 z-40">
      <div className="px-4 py-4 flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-gray-100 rounded-xl transition-all transform hover:scale-105"
        >
          {sidebarOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
        </button>
        
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            AuroraWeb
          </h1>
        </div>
        
        <button
          onClick={onLogout}
          className="p-2 hover:bg-red-50 rounded-xl transition-all transform hover:scale-105 text-red-600"
          title="Cerrar sesión"
        >
          <LogOut className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;