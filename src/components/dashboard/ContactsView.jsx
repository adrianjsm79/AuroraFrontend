import React from 'react';
import { Plus, UserPlus, Users, Trash2 } from 'lucide-react';

const ContactsView = ({ 
  trustedContacts, 
  showAddContact, 
  setShowAddContact,
  newContactNumber,
  setNewContactNumber,
  addTrustedContact,
  removeTrustedContact
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Contactos de Confianza</h2>
            <p className="text-gray-600 mt-1">Gestiona quién puede ver tu ubicación</p>
          </div>
          <button
            onClick={() => setShowAddContact(!showAddContact)}
            className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition transform hover:scale-105 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span className="font-semibold">Agregar</span>
          </button>
        </div>

        {showAddContact && (
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 mb-6 border-2 border-indigo-100">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center">
              <UserPlus className="w-5 h-5 mr-2 text-indigo-600" />
              Agregar Nuevo Contacto
            </h3>
            <div className="flex space-x-3">
              <input
                type="tel"
                value={newContactNumber}
                onChange={(e) => setNewContactNumber(e.target.value)}
                placeholder="Número de teléfono (ej: +51987654321)"
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                onKeyPress={(e) => e.key === 'Enter' && addTrustedContact()}
              />
              <button
                onClick={addTrustedContact}
                className="bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700 transition font-semibold shadow-lg transform hover:scale-105"
              >
                Agregar
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {trustedContacts.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
                <Users className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">No tienes contactos de confianza aún</p>
              <p className="text-gray-400 text-sm mt-2">Agrega contactos para compartir ubicaciones</p>
            </div>
          ) : (
            trustedContacts.map((contact, index) => (
              <div
                key={contact.id}
                className="flex items-center justify-between p-5 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-indigo-50 hover:to-purple-50 rounded-xl transition-all transform hover:scale-102 shadow-sm hover:shadow-md"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-xl">
                      {contact.nombre.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-lg">{contact.nombre}</p>
                    <p className="text-sm text-gray-600">{contact.email}</p>
                    <p className="text-xs text-indigo-600 font-medium mt-1">{contact.numero}</p>
                  </div>
                </div>
                <button
                  onClick={() => removeTrustedContact(contact.id)}
                  className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all transform hover:scale-110"
                  title="Eliminar contacto"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {trustedContacts.length > 0 && (
        <div className="bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-2xl shadow-xl p-6 text-white">
          <h3 className="font-bold text-xl mb-3">💡 Consejo</h3>
          <p className="text-indigo-100">
            Tus contactos pueden ver tu ubicación en tiempo real cuando la tienes activa. 
            Asegúrate de agregar solo personas de confianza.
          </p>
        </div>
      )}
    </div>
  );
};

export default ContactsView;