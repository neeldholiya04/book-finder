import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center mb-4">
      <input
        type="text"
        placeholder="Search for books..."
        className="flex-grow p-2 border border-gray-300 rounded-l-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button
        onClick={handleSearch}
        className="p-2 bg-blue-500 text-white rounded-r-md dark:bg-blue-600 hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
