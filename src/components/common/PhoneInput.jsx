import React, { useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { countries } from '../../utils/countries';

const PhoneInput = ({ prefix, onPrefixChange, number, onNumberChange, placeholder }) => {
  const selectedCountry = countries.find(c => c.prefix === prefix) || countries[0];

  return (
    <div className="flex items-center space-x-2 w-full">
      <div className="relative w-32">
        <Listbox value={selectedCountry} onChange={(country) => onPrefixChange(country.prefix)}>
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-default rounded-xl bg-gray-50 dark:bg-gray-700 py-3 pl-3 pr-10 text-left border-2 border-gray-200 dark:border-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75">
              <span className="block truncate dark:text-gray-200">{selectedCountry.flag} {selectedCountry.prefix}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {countries.map((country, countryIdx) => (
                  <Listbox.Option
                    key={countryIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? 'bg-primary/10 text-primary' : 'text-gray-900 dark:text-gray-200'
                      }`
                    }
                    value={country}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {country.flag} {country.name} ({country.prefix})
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
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
