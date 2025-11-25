import React, { useState } from 'react';
import HomePage from './components/Homepage.jsx'; 
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { ThemeProvider, useTheme } from './context/ThemeContext.jsx';

const ThemeWrapper = ({ children }) => {
    const { isDarkMode } = useTheme(); 
    const bgClass = isDarkMode ? 'bg-dark-background' : 'bg-light-background'; 
    
    return (
        <div className={`${bgClass} min-h-screen transition-colors duration-300 flex flex-col`}>
            {children}
        </div>
    );
};

const AppContent = () => {
  const { user } = useAuth();
  const { toggleTheme, themeClasses, isDarkMode } = useTheme();
  
  // Estado para controlar la vista actual
  const [currentView, setCurrentView] = useState('home');
  
  // Función para ir al home
  const handleGoHome = () => setCurrentView('home');
  const handleLoginClick = () => setCurrentView('login');
  const handleDashboardClick = () => setCurrentView('dashboard');

  return (
    <>
      <header className={`p-4 shadow-md ${isDarkMode ? 'bg-dark-surface border-b border-dark-secondary-surface' : 'bg-white border-b border-gray-200'}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo clickeable para ir al inicio */}
          <button 
            onClick={handleGoHome}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <span className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold">A</span>
            <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Aurora</span>
          </button>
          
          <div className="flex items-center gap-4">
            {/* Botón de retroceso (solo si no estamos en home) */}
            {currentView !== 'home' && (
              <button
                onClick={handleGoHome}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  isDarkMode 
                    ? 'bg-dark-secondary-surface hover:bg-dark-surface text-dark-text-primary' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                ← Volver al inicio
              </button>
            )}
            
            {/* Botón de tema */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-dark-secondary-surface hover:bg-dark-surface text-yellow-400' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
              title={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        {/* Renderizado condicional según la vista actual */}
        {currentView === 'home' && (
          <HomePage 
            onLoginClick={handleLoginClick} 
            onDashboardClick={handleDashboardClick} 
          />
        )}
        
        {currentView === 'login' && (
          <div className={`max-w-md mx-auto mt-20 p-8 rounded-xl ${isDarkMode ? 'bg-dark-surface' : 'bg-white shadow-lg'}`}>
            <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Iniciar Sesión
            </h2>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              Formulario de login aquí...
            </p>
            {/* Aquí irá tu formulario de login */}
          </div>
        )}
        
        {currentView === 'dashboard' && (
          <div className={`max-w-7xl mx-auto mt-20 p-8 rounded-xl ${isDarkMode ? 'bg-dark-surface' : 'bg-white shadow-lg'}`}>
            <h2 className={`text-3xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Dashboard
            </h2>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
              Dashboard aquí...
            </p>
            {/* Aquí irá tu dashboard */}
          </div>
        )}
      </main>

      {/* Footer solo se muestra en home */}
      {currentView === 'home' && (
        <footer className={`p-8 text-center ${themeClasses.footer}`}>
          <p className="text-sm">
            © {new Date().getFullYear()} Aurora. Todos los derechos reservados.
          </p>
        </footer>
      )}
    </>
  );
};

const App = () => (
  <AuthProvider>
    <ThemeProvider> 
      <ThemeWrapper> 
        <AppContent />
      </ThemeWrapper>
    </ThemeProvider>
  </AuthProvider>
);

export default App;