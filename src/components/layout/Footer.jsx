import React from "react";
import { useTheme } from "../../context/ThemeContext";
import GitHubIcon from "@mui/icons-material/GitHub";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import SecurityIcon from "@mui/icons-material/Security";
import CodeIcon from "@mui/icons-material/Code";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import PolicyIcon from "@mui/icons-material/Policy";
import PersonIcon from "@mui/icons-material/Person";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";

const Footer = () => {
  const { isDarkMode } = useTheme();
  const currentYear = new Date().getFullYear();

  const bgClass = isDarkMode
    ? "bg-dark-surface border-t border-dark-secondary-surface"
    : "bg-gray-50 border-t border-gray-200";

  const textPrimaryClass = isDarkMode ? "text-white" : "text-gray-900";
  const textSecondaryClass = isDarkMode ? "text-slate-400" : "text-gray-600";

  const linkClass = isDarkMode
    ? "text-primary hover:text-white transition-colors"
    : "text-primary hover:text-gray-900 transition-colors";

  const socialIconClass = isDarkMode
    ? "text-slate-400 hover:text-white"
    : "text-gray-500 hover:text-gray-900";

  return (
    <footer className={`${bgClass} mt-auto transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-6">

        {/* MAIN GRID */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-10 gap-x-8 mb-12">

          {/* COMPANY */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg">
                <LocationOnIcon 
                  className="text-white drop-shadow-md" 
                  sx={{ fontSize: 42 }} 
                />
              </div>
              <span className={`font-bold text-xl ${textPrimaryClass}`}>Aurora</span>
            </div>

            <p className={`text-sm ${textSecondaryClass} leading-relaxed`}>
              Aplicación de seguridad en tiempo real para mantener a tus dispositivos protegidos.
            </p>

            {/* SOCIAL */}
            <div className="flex space-x-4 mt-6">
              {[
                { Icon: GitHubIcon, href: "https://github.com/adrianjsm79/", title: "GitHub" },
                { Icon: XIcon, href: "https://x.com/", title: "Twitter" },
                { Icon: InstagramIcon, href: "https://www.instagram.com/", title: "Instagram" },
               
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${socialIconClass} transition-transform hover:scale-110`}
                  title={item.title}
                >
                  <item.Icon sx={{ fontSize: 24 }} />
                </a>
              ))}
            </div>
          </div>

          {/* PRODUCT */}
          <div>
            <h3 className={`font-semibold mb-4 ${textPrimaryClass} flex items-center`}>
              <SecurityIcon fontSize="small" className="mr-2 text-primary" /> Producto
            </h3>
            <ul className="space-y-3">
              <li><a href="#features" className={`text-sm ${linkClass}`}>Características</a></li>
              <li><a href="#security" className={`text-sm ${linkClass}`}>Seguridad</a></li>
              <li><a href="https://github.com/adrianjsm79/aurora2/releases" className={`text-sm ${linkClass}`}>Descargar App</a></li>
            </ul>
          </div>

          {/* OPEN SOURCE */}
          <div>
            <h3 className={`font-semibold mb-4 ${textPrimaryClass} flex items-center`}>
              <CodeIcon fontSize="small" className="mr-2 text-primary" /> Código Abierto
            </h3>
            <ul className="space-y-3">
              <li><a href="https://github.com/adrianjsm79/AuroraBackend" target="_blank" className={`text-sm ${linkClass}`}>GitHub Backend</a></li>
              <li><a href="https://github.com/adrianjsm79/AuroraFrontend" target="_blank" className={`text-sm ${linkClass}`}>GitHub Frontend</a></li>
              <li><a href="https://www.linkedin.com/" className={`text-sm ${linkClass}`}>Contacto</a></li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className={`font-semibold mb-4 ${textPrimaryClass} flex items-center`}>
              <LiveHelpIcon fontSize="small" className="mr-2 text-primary" /> Soporte
            </h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://wa.me/51947179270?text=Hola,%20necesito%20ayuda%20con%20Aurora" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm ${linkClass}`}
                >
                  Soporte general
                </a>
              </li>
              <li><a href="/terms/faq.html" className={`text-sm ${linkClass}`}>Preguntas Frecuentes</a></li>

            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h3 className={`font-semibold mb-4 ${textPrimaryClass} flex items-center`}>
              <PolicyIcon fontSize="small" className="mr-2 text-primary" /> Legal
            </h3>
            <ul className="space-y-3">
              <li><a href="/terms/politicas.html" className={`text-sm ${linkClass}`}>Política de Privacidad</a></li>
              <li><a href="/terms/terminos.html" className={`text-sm ${linkClass}`}>Términos de Servicio</a></li>
            </ul>
          </div>

        </div>

        


        {/* BOTTOM */}
        

          <div className="flex items-center space-x-4">
            <span className={`text-xs ${textSecondaryClass}`}>v1.0.0</span>
            <span className="text-xs text-green-500 flex items-center">
              <CloudQueueIcon sx={{ fontSize: 14 }} className="mr-1" /> Operativo
            </span>
          </div>
        </div>

        
    </footer>
  );
};

export default Footer;
