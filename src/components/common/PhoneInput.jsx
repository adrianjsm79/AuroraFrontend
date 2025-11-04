import React from 'react';
import { countries } from '../../utils/countries';

const PhoneInput = ({ prefix, onPrefixChange, number, onNumberChange, placeholder }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative">
        <select
          value={prefix}
          onChange={onPrefixChange}
          className="appearance-none bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl py-3 pl-4 pr-8 focus:ring-2 focus:ring-primary focus:border-transparent transition text-gray-800 dark:text-gray-200"
        >
          {countries.map((country) => (
            <option key={country.code} value={country.prefix}>
              {country.prefix} ({country.code})
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-400">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
      <input
        type="tel"
        value={number}
        onChange={onNumberChange}
        className="w-full px-4 py-3 border-2 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
        placeholder={placeholder || "987654321"}
        required
      />
    </div>
  );
};

export default PhoneInput;
