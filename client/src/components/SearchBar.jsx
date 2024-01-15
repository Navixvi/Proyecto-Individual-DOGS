import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="searchBarContainer">
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={searchTerm}
        onChange={handleInputChange}
        className="searchInput"
      />
      <button onClick={handleSearch} className="searchButton">
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;

