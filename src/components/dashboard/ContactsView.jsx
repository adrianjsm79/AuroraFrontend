import React, { useState } from 'react';
import { Plus, UserPlus, Users, Trash2, UserCheck } from 'lucide-react';
import PhoneInput from '../common/PhoneInput';
import { countries } from '../../utils/countries';

const ContactsView = ({ 
  trustedContacts,
  receivedContacts,
  showAddContact, 
  setShowAddContact,
  addTrustedContact,
  removeTrustedContact
}) => {
  const [phonePrefix, setPhonePrefix] = useState(countries[0].prefix);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleAddClick = async () => {
    if (!phoneNumber.trim()) {
      setError('Por favor ingresa un número de teléfono');
      return;
    }
    const fullNumber = `${phonePrefix}${phoneNumber}`;
    const result = await addTrustedContact(fullNumber);
    if (result.success) {
      setPhoneNumber('');
      setError('');
    } else {
      setError(result.error);
    }
  };

  const ContactCard = ({ contact, isReceived = false }) => (
    <div className="flex items-center justify-between p-5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all transform hover:scale-102 shadow-sm hover:shadow-md dark:bg-gray-700/50 dark:hover:bg-gray-700">
      <div className="flex items-center space-x-4 flex-1">
        <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg relative">
          <span className="text-white font-bold text-xl">
            {contact.nombre.charAt(0)}
          </span>
          {isReceived && (
            <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1 shadow-lg">
              <UserCheck className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
        <div>
          <p className="font-bold text-gray-800 dark:text-gray-200 text-lg">{contact.nombre}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{contact.email}</p>
          <p className="text-xs text-primary font-medium mt-1">{contact.numero}</p>
          {isReceived && <p className="text-xs text-green-600 dark:text-green-400 font-semibold mt-1">Te dio confianza</p>}
        </div>
      </div>
      {!isReceived && (
        <button
          onClick={() => removeTrustedContact(contact.id)}
          className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all transform hover:scale-110 dark:hover:bg-red-900/50"
          title="Eliminar contacto"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Sección: Contactos que TÚ diste */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Mis Contactos</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Contactos a los que les diste confianza</p>
          </div>
          <button
            onClick={() => setShowAddContact(!showAddContact)}
            className="flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-xl transition transform hover:scale-105 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span className="font-semibold">Agregar</span>
          </button>
        </div>

        {showAddContact && (
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 mb-6 border-2 border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
              <UserPlus className="w-5 h-5 mr-2 text-primary" />
              Agregar Nuevo Contacto
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center space-x-3">
                <PhoneInput
                  prefix={phonePrefix}
                  onPrefixChange={(value) => setPhonePrefix(value)}
                  number={phoneNumber}
                  onNumberChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Número de contacto"
                />
                <button
                  onClick={handleAddClick}
                  className="bg-primary text-white px-8 py-3 rounded-xl hover:bg-secondary transition font-semibold shadow-lg transform hover:scale-105"
                >
                  Agregar
                </button>
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
            </div>
          </div>
        )}

        <div className="space-y-3">
          {trustedContacts.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mb-3">
                <Users className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-gray-500 dark:text-gray-400">No tienes contactos de confianza</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">Agrega contactos para compartir ubicaciones</p>
            </div>
          ) : (
            trustedContacts.map((contact, index) => (
              <div key={contact.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <ContactCard contact={contact} isReceived={false} />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Sección: Contactos que TE DIERON confianza */}
      {receivedContacts.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
          <div className="mb-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl shadow-lg">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Contactos que te confían</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Pueden ver tu ubicación</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {receivedContacts.map((contact, index) => (
              <div key={contact.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <ContactCard contact={contact} isReceived={true} />
              </div>
            ))}
          </div>
        </div>
      )}

      {(trustedContacts.length > 0 || receivedContacts.length > 0) && (
        <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl shadow-xl p-6 text-white">
          <h3 className="font-bold text-xl mb-3">💡 Consejo de privacidad</h3>
          <p className="text-white/80">
            Tu ubicación es compartida con los contactos que agregaste y pueden ser vistos por aquellos que te dieron confianza. 
            Administra tus dispositivos para controlar qué ubicaciones compartir.
          </p>
        </div>
      )}
    </div>
  );
};

export default ContactsView;
