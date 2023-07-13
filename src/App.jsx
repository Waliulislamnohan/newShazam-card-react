import React, { useState } from 'react';

const App = () => {
  const [lyricsInput, setLyricsInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    if (lyricsInput.trim() === '') {
      return;
    }

    setIsLoading(true);
    setError(null);

    fetch(`https://api.deezer.com/search?q=${encodeURIComponent(lyricsInput)}`)
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
    <div>
      <h1>Lyrics Search</h1>
      <input
        type="text"
        value={lyricsInput}
        onChange={(e) => setLyricsInput(e.target.value)}
        placeholder="Enter lyrics"
      />
      <button onClick={handleSearch}>Search</button>

      <h2>Search Results</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {searchResults.map((song) => (
            <li key={song.id}>
              <h3>{song.title}</h3>
              <p>{song.artist.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
