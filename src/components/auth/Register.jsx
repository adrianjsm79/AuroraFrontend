import React, { useState } from 'react';
import { UserPlus, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import PhoneInput from '../common/PhoneInput';
import { countries } from '../../utils/countries';

const Register = ({ onToggle }) => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    password2: '',
  });
  const [phonePrefix, setPhonePrefix] = useState(countries[0].prefix);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.password2) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    const fullNumber = `${phonePrefix}${phoneNumber}`;
    const result = await register({ ...formData, numero: fullNumber });
    setLoading(false);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => onToggle(), 2000);
    } else {
      setError(result.error);
    }
  };

  if (success) {
    return (
      <div className={`min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4 relative overflow-hidden`}>
        <div className={`relative backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-md text-center border ${
          isDarkMode 
            ? 'bg-gray-800/60 border-gray-700/50' 
            : 'bg-white/80 border-white/50'
        }`}>
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-4 animate-pulse ${
            isDarkMode 
              ? 'bg-green-900/40' 
              : 'bg-green-100'
          }`}>
            <svg className={`w-10 h-10 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>¡Registro Exitoso!</h3>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Redirigiendo al inicio de sesión...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4 relative overflow-hidden`}>
      {/* Fondo con patrón */}
      <div className={`absolute inset-0 ${isDarkMode ? 'bg-black/40' : 'bg-black/10'}`}></div>
      
      {/* Tarjeta semitransparente */}
      <div className={`relative backdrop-blur-md rounded-3xl shadow-2xl p-8 w-full max-w-md transform transition-all border ${
        isDarkMode 
          ? 'bg-gray-800/60 border-gray-700/50' 
          : 'bg-white/80 border-white/50'
      }`}>
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full mb-4 shadow-lg">
            <UserPlus className="w-10 h-10 text-white" />
          </div>
          <h2 className={`text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent`}>
            Crear Cuenta
          </h2>
          <p className={`text-gray-600 mt-2 ${isDarkMode ? 'text-gray-300' : ''}`}>Únete a Aurora</p>
        </div>

        {error && (
          <div className={`border-l-4 border-red-500 rounded-lg mb-4 flex items-start p-4 ${
            isDarkMode 
              ? 'bg-red-900/30 text-red-300' 
              : 'bg-red-50 text-red-700'
          }`}>
            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-semibold mb-2 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Nombre Completo
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition ${
                isDarkMode
                  ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-400'
              }`}
              placeholder="Juan Pérez"
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-2 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition ${
                isDarkMode
                  ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-400'
              }`}
              placeholder="tu@email.com"
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-2 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Número de Teléfono
            </label>
            <PhoneInput
              prefix={phonePrefix}
              onPrefixChange={(value) => setPhonePrefix(value)}
              number={phoneNumber}
              onNumberChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-2 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition ${
                isDarkMode
                  ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-400'
              }`}
              placeholder="••••••••"
              required
              minLength={8}
            />
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-2 ${
              isDarkMode ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Confirmar Contraseña
            </label>
            <input
              type="password"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition ${
                isDarkMode
                  ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-400'
              }`}
              placeholder="••••••••"
              required
              minLength={8}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl font-semibold transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-2xl"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <div className="loading-spinner mr-2"></div>
                Registrando...
              </span>
            ) : (
              'Registrarse'
            )}
          </button>
        </form>

        <div className={`mt-6 text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <p>
            ¿Ya tienes cuenta?{' '}
            <button
              onClick={onToggle}
              className="text-primary font-semibold hover:text-secondary transition"
            >
              Inicia sesión aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;