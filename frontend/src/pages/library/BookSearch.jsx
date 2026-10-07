import { useState } from 'react';

export default function BookSearch({ onSearch, loading }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery('');
    onSearch('');
  };

  return (
    <div className="search-container">
      <h2>🔍 Search Books</h2>
      <form onSubmit={handleSearch}>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by title or author (e.g., Harry Potter)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
          <button
            type="button"
            onClick={handleClear}
            disabled={loading}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}