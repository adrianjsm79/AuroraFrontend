import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import LoadingScreen from './components/common/LoadingScreen';
import HomePage from './components/home/HomePage';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

const AppContent = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'auth', 'dashboard'
  const { user, loading } = useAuth();
  const { isDarkMode } = useTheme();

  if (loading) {
    return <LoadingScreen />;
  }

  // Si el usuario no está logeado, mostrar home/auth
  if (!user) {
    return (
      <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-dark-background' : 'bg-light-background'}`}>
        <Navbar 
          onLoginClick={() => setCurrentPage('auth')} 
          onDashboardClick={() => setCurrentPage('home')}
        />
        <div className="flex-1">
          {currentPage === 'auth' ? (
            showLogin ? (
              <Login onToggle={() => setShowLogin(false)} />
            ) : (
              <Register onToggle={() => setShowLogin(true)} />
            )
          ) : (
            <HomePage 
              onLoginClick={() => setCurrentPage('auth')}
              onDashboardClick={() => setCurrentPage('auth')}
            />
          )}
        </div>
        <Footer />
      </div>
    );
  }

  // Usuario logeado - mostrar dashboard por defecto o home si prefiere
  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-dark-background' : 'bg-light-background'}`}>
      <Navbar 
        onLoginClick={() => setCurrentPage('home')} 
        onDashboardClick={() => setCurrentPage('dashboard')}
      />
      <div className="flex-1">
        {currentPage === 'dashboard' ? (
          <Dashboard 
            onGoHome={() => setCurrentPage('home')}
          />
        ) : (
          <HomePage 
            onLoginClick={() => setCurrentPage('home')}
            onDashboardClick={() => setCurrentPage('dashboard')}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;