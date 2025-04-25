import React, { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const SearchBar = ({ searchTerm, setSearchTerm, doctors }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
  };

  const handleSuggestionClick = (name) => {
    setSearchTerm(name);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setShowSuggestions(false);
    }
  };

  const suggestions = doctors
    .filter(doctor =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 3);

  return (
    <div className="relative w-full md:w-1/2 mx-auto my-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
        </div>
        <input
          type="text"
          placeholder="Search Symptoms, Doctors, Specialists, Clinics"
          className="w-full p-3 pl-10 bg-white text-black placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(searchTerm.length > 0)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          data-testid="autocomplete-input"
        />
      </div>
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
          {suggestions.map((doctor) => (
            <div
              key={doctor.id}
              className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-0"
              onClick={() => handleSuggestionClick(doctor.name)}
              data-testid="suggestion-item"
            >
              {doctor.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
