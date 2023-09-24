import React, { useState } from 'react';
import './App.css'; 
const SearchForm = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="search"
          value={searchQuery}
          onChange={handleInputChange}
          className="searchBox"
          placeholder="Write lyrics to search song"
        />

      </div>
    </form>
  );
};

export default SearchForm;
