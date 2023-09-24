import React, { useState, useEffect } from 'react';

const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      return;
    }

    setIsLoading(true);
    setError(null);

    fetch(`${corsProxyUrl}https://api.deezer.com/search?q=${encodeURIComponent(searchQuery)}`, {
      method: 'GET',
      headers: {
        'Origin': 'http://localhost:1340'
      },
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

  useEffect(() => {
    document.title = 'Lyrics Search App';
  }, []);

  return (
    <div className='flex items-center justify-center min-h-screen from-cyan-100 via-pink-200 to-yellow-200 bg-gradient-to-br'>
      <div className="flex items-center max-w-md mx-auto bg-white rounded-lg " x-data="{ search: '' }">
        <form className="w-full" onSubmit={handleSubmit}>
          <input
            type="search"
            className="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none"
            placeholder="Search"
            value={searchQuery}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className={`flex items-center bg-blue-500 justify-center w-12 h-12 text-white rounded-r-lg ${
              searchQuery.length > 0 ? 'bg-purple-500' : 'bg-gray-500 cursor-not-allowed'
            }`}
            disabled={searchQuery.length === 0}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
        </form>
      </div>

      <h2 className="mt-5 text-xl">Search Results</h2>
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
