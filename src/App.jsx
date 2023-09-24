// src/App.js
import React, { useState } from 'react';
import './App.css'; // Import your CSS file here
import SearchForm from './SearchForm';

const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = (query) => {
    if (query.trim() === '') {
      return;
    }

    setIsLoading(true);
    setError(null);

    fetch(`${corsProxyUrl}https://api.deezer.com/search?q=${encodeURIComponent(query)}`, {
      method: 'GET',

    })
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError('Error searching songs...');
        setIsLoading(false);
      });
  };

  return (
    <div className="component">
      <h1>Shazam <br /> swing you mood by listening to your heart's music</h1>
      
      {/* Include the SearchForm component */}
      <SearchForm onSearch={handleSearch} />

      <h2>Search Results</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (

        <ul>
          {searchResults.map((song) => (
            <li key={song.id}>
              <h3>Title of the song: {song.title}</h3>
              <p>Artist name: {song.artist.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
