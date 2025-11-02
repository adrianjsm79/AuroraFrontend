import React from 'react';
import { ShieldCheck, FileText, Info, Download } from 'lucide-react';

const AboutView = () => {
  return (
    <div className="max-w-4xl mx-auto text-gray-800 dark:text-gray-200">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="flex items-center mb-6">
          <Info className="w-8 h-8 text-primary mr-4" />
          <h2 className="text-3xl font-bold">Sobre Aurora</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Aurora es una aplicación de seguimiento de ubicación en tiempo real diseñada para tu tranquilidad y la de tus seres queridos. Nuestra misión es ofrecer una forma segura y confiable de compartir tu ubicación con contactos de confianza, asegurando que siempre estés conectado con quienes más te importan.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Columna de Información y QR */}
          <div>
            <h3 className="text-xl font-bold mb-4">Descarga la App Móvil</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Escanea el código QR para descargar la aplicación móvil y disfrutar de todas las funcionalidades en tu dispositivo.
            </p>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl flex justify-center items-center">
              <img 
                src="/images/qrAuroraReleases.png" 
                alt="QR Code para descargar la app móvil" 
                className="w-48 h-48"
              />
            </div>
            <a
              href="/images/qrAuroraReleases.png" // En un caso real, este sería el enlace de descarga directo
              download
              className="mt-4 w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl font-semibold transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg flex items-center justify-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Descargar QR</span>
            </a>
          </div>

          {/* Columna de Legales */}
          <div>
            <h3 className="text-xl font-bold mb-4">Información Legal</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Tu seguridad y privacidad son nuestra máxima prioridad. Consulta nuestros documentos legales para entender cómo protegemos tus datos.
            </p>
            <div className="space-y-3">
              <a href="#" className="flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition group dark:bg-gray-700/50 dark:hover:bg-gray-700">
                <FileText className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400 group-hover:text-primary transition" />
                <span className="font-semibold text-gray-700 dark:text-gray-300">Términos y Condiciones</span>
              </a>
              <a href="#" className="flex items-center p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition group dark:bg-gray-700/50 dark:hover:bg-gray-700">
                <ShieldCheck className="w-5 h-5 mr-3 text-gray-500 dark:text-gray-400 group-hover:text-primary transition" />
                <span className="font-semibold text-gray-700 dark:text-gray-300">Política de Privacidad y Datos</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutView;
