import React, { useState, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import LoadingScreen from './components/common/LoadingScreen';
import Navbar from './components/layout/Navbar';
import DashboardNavbar from './components/layout/DashboardNavbar';
import Footer from './components/layout/Footer';
import PageTransition from './components/common/PageTransition';

// Lazy loading de componentes
const Login = React.lazy(() => import('./components/auth/Login'));
const Register = React.lazy(() => import('./components/auth/Register'));
const Dashboard = React.lazy(() => import('./components/dashboard/Dashboard'));
const HomePage = React.lazy(() => import('./components/home/HomePage'));

// Componente protegido para rutas que requieren autenticación
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Componente para rutas públicas (redirige si ya está logeado)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const AppContent = () => {
  const [showLogin, setShowLogin] = useState(true);
  const { user, loading, logout } = useAuth();
  const { isDarkMode } = useTheme();
  const location = useLocation();
  
  const isDashboard = location.pathname.startsWith('/dashboard');

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'bg-dark-background' : 'bg-light-background'}`}>
      {/* Mostrar navbar diferente según si estamos en dashboard */}
      {isDashboard ? (
        <DashboardNavbar />
      ) : (
        <Navbar 
          onLoginClick={() => {}} 
          onDashboardClick={() => {}}
        />
      )}
      
      <PageTransition>
        <div className="flex-1">
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              {/* Rutas públicas */}
              <Route 
                path="/" 
                element={
                  user ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <HomePage 
                      onLoginClick={() => {}}
                      onDashboardClick={() => {}}
                    />
                  )
                } 
              />

              {/* Rutas de autenticación */}
              <Route 
                path="/login" 
                element={
                  <PublicRoute>
                    <Login onToggle={() => setShowLogin(false)} />
                  </PublicRoute>
                } 
              />
              <Route 
                path="/register" 
                element={
                  <PublicRoute>
                    <Register onToggle={() => setShowLogin(true)} />
                  </PublicRoute>
                } 
              />

              {/* Rutas del dashboard */}
              <Route 
                path="/dashboard/*" 
                element={
                  <ProtectedRoute>
                    <Dashboard onGoHome={() => {}} />
                  </ProtectedRoute>
                } 
              />

              {/* Ruta por defecto */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </div>
      </PageTransition>
      
      {/* Footer siempre visible */}
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
