import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = () => {
  const location = useLocation();

  // Mapeo de rutas a labels
  const routeLabels = {
    '/dashboard': 'Inicio',
    '/dashboard/map': 'Mapa en Vivo',
    '/dashboard/devices': 'Dispositivos',
    '/dashboard/contacts': 'Contactos',
    '/dashboard/account': 'Mi Cuenta',
    '/dashboard/about': 'Información',
  };

  // Generar breadcrumbs basado en la ruta actual
  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = [];

    // Breadcrumb inicio
    breadcrumbs.push({
      label: 'Dashboard',
      path: '/dashboard',
      icon: Home,
    });

    // Construir ruta completa
    let currentPath = '';
    for (let i = 1; i < pathSegments.length; i++) {
      currentPath += `/${pathSegments[i]}`;
      const fullPath = `/dashboard${currentPath === '/' ? '' : currentPath}`;
      const label = routeLabels[fullPath] || pathSegments[i];

      breadcrumbs.push({
        label,
        path: fullPath,
        icon: null,
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Solo mostrar si estamos en dashboard
  if (!location.pathname.startsWith('/dashboard')) {
    return null;
  }

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 md:px-8 lg:px-12 py-3">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-1 text-sm">
          {breadcrumbs.map((breadcrumb, index) => {
            const Icon = breadcrumb.icon;
            const isLast = index === breadcrumbs.length - 1;

            return (
              <div key={breadcrumb.path} className="flex items-center space-x-1">
                {Icon && <Icon className="w-4 h-4 text-gray-500 dark:text-gray-400" />}
                
                {isLast ? (
                  <span className="text-gray-700 dark:text-gray-300 font-semibold px-2">
                    {breadcrumb.label}
                  </span>
                ) : (
                  <>
                    <Link
                      to={breadcrumb.path}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors px-2 font-medium"
                    >
                      {breadcrumb.label}
                    </Link>
                    <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-600" />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
